import axios from "axios";
import { useRooom } from "../store";

type UploadedPart = {
  ETag: string;
  PartNumber: number;
};

type FailedPart = {
  url: string;
  chunk: Blob;
  partno: number;
};

export class RecordingUploader {
  /* ---------- STATE ---------- */
  private roomId: string | null;
  private uploadId!: string;
  private recId!: string;

  private chunks: Blob[] = [];
  private etags: UploadedPart[] = [];

  private readonly chunkSize = 10 * 1024 * 1024;
  private readonly baseURL = "http://localhost:3003";

  constructor(private file: File) {
    this.roomId = useRooom.getState().roomId;
  }

  /* ---------- HELPERS ---------- */

  private get token() {
    return localStorage.getItem("token");
  }

  private get headers() {
    return { Authorization: `Bearer ${this.token}` };
  }

  private get totalChunks() {
    return Math.ceil(this.file.size / this.chunkSize);
  }

  private get fileName() {
    return this.file.name.replace(/\.[^/.]+$/, "");
  }

  /* ---------- LIFECYCLE ---------- */

  async start() {
    try {
      await this.initMultipart();
      await this.prepareChunks();
      await this.uploadAllChunks();
      await this.verifyAndComplete();
    } catch (e) {
      await this.abort();
      throw e;
    }
  }

  /* ---------- STEPS ---------- */

  private async initMultipart() {
    const res = await axios.post(
      `${this.baseURL}/upload/start-multipart`,
      {
        filename: this.fileName,
        roomid: this.roomId,
        contentType: "video/mp4",
      },
      { headers: this.headers }
    );

    if (!res.data?.status) throw new Error("Multipart init failed");

    this.uploadId = res.data.data.UploadId;
    this.recId = res.data.data.recID;
  }

  private async prepareChunks() {
    this.chunks = Array.from({ length: this.totalChunks }, (_, i) =>
      this.file.slice(i * this.chunkSize, (i + 1) * this.chunkSize)
    );
  }

  private async uploadAllChunks() {
    const { data: urls } = await axios.post(
      `${this.baseURL}/upload/multipart-urls`,
      {
        UploadId: this.uploadId,
        recID: this.recId,
        roomid: this.roomId,
        PartNumber: this.totalChunks,
      },
      { headers: this.headers }
    );

    const results = await Promise.allSettled(
      urls.map((url: string, i: number) =>{
          if(this.chunks[i])
            this.uploadSingleChunk(url, this.chunks[i], i)
        }
      )
    );

    const failed: FailedPart[] = [];

    results.forEach((r, i) => {
      if (r.status === "fulfilled") {
        this.etags.push(r.value);
      } else if(this.chunks[i]) {
        failed.push({ url: urls[i], chunk: this.chunks[i], partno: i });
      }
    });

    if (failed.length) {
      await this.retryFailed(failed);
    }
  }

  private async uploadSingleChunk(
    url: string,
    chunk: Blob,
    partno: number
  ): Promise<UploadedPart> {
    const res = await axios.put(url, chunk, {
      headers: { "Content-Type": "video/mp4" },
    });

    return {
      ETag: res.headers.etag.replaceAll('"', ""),
      PartNumber: partno + 1,
    };
  }

  private async retryFailed(failed: FailedPart[]) {
    const retries = await Promise.allSettled(
      failed.map((f) =>
        this.uploadSingleChunk(f.url, f.chunk, f.partno)
      )
    );

    if (retries.some((r) => r.status === "rejected")) {
      throw new Error("Retry failed");
    }

    retries.forEach((r) => {
      if (r.status === "fulfilled") this.etags.push(r.value);
    });
  }

  private async verifyAndComplete() {
    if (this.etags.length !== this.totalChunks) {
      throw new Error("Chunk count mismatch");
    }

    this.etags.sort((a, b) => a.PartNumber - b.PartNumber);

    await axios.post(
      `${this.baseURL}/upload/complete-multipart`,
      {
        UploadId: this.uploadId,
        recID: this.recId,
        roomid: this.roomId,
        Parts: this.etags,
      },
      { headers: this.headers }
    );
  }

  private async abort() {
    if (!this.uploadId) return;

    await axios.post(
      `${this.baseURL}/upload/abort-multipart`,
      {
        UploadId: this.uploadId,
        recID: this.recId,
        roomid: this.roomId,
      },
      { headers: this.headers }
    );
  }
}
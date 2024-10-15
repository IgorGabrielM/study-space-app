import { Injectable } from "@angular/core";
import { Storage, getDownloadURL, ref, uploadBytes } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private storage: Storage,
  ) { }

  async uploadImageBlob(blob: Blob, directory: string) {
    const currentData = Date.now()
    const filePath = `${directory}/${currentData}.png`
    const fileRef = ref(this.storage, filePath);
    const task = await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(fileRef);
    return url;
  }
}

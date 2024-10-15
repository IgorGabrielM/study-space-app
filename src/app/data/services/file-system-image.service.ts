import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileSystemImageService {

  constructor() { }

  async getPhoto(camType: 'camera' | 'gallery') {
    if(camType === 'gallery') {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
        quality: 50,
        saveToGallery: true,
        promptLabelCancel: 'Cancelar',
        promptLabelPhoto: 'Galeria',
        height: 1280,
        width: 720
      });
      return {
        base64Image: capturedPhoto.base64String
      }
    } else {
        const capturedPhoto = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 30,
            saveToGallery: true,
            promptLabelCancel: 'Cancelar',
            promptLabelPhoto: 'Galeria',
            promptLabelPicture: 'Camera',
            height: 1280,
            width: 720
        });
        return {
            filepath: capturedPhoto.path,
            webviewPath: capturedPhoto.webPath!
        }
    }
  }

  /*
      async savePictureByBase64(photo: string) {
          const base64Data = photo
          const fileName = Date.now() + '.jpeg';
          const savedFile = await Filesystem.writeFile({
              path: fileName,
              data: base64Data,
              directory: Directory.Data
          });
          return savedFile.uri
      }

      async savePicture(photo: Photo) {
          const base64Data = await this.readAsBase64(photo)
          const fileName = Date.now() + '.jpeg';
          const savedFile = await Filesystem.writeFile({
              path: fileName,
              data: base64Data,
              directory: Directory.Data
          });
          return {
              filepath: fileName,
              webviewPath: photo.webPath
          };
      }

      async convertFilePathToBlob(webPath: string) {
          const indexWebPath = webPath.indexOf(`_capacitor_file_/`) + "_capacitor_file_/".length;
          const pathRemoveUnused = webPath.slice(indexWebPath);
          const path = `file:///${pathRemoveUnused}`;

          const contents: ReadFileResult = await Filesystem.readFile({ path: path });

          const base64String = `data:image/png;base64,${contents.data}`;
          return base64String;
      }

      async deleteImageWebPath(webPath: string) {
          if (webPath) {
              let indexLocate = webPath.indexOf("http://192.168.15.6:8100/_capacitor_file_//") + "http://192.168.15.6:8100/_capacitor_file_//".length;
              let locateRemoveUnused = webPath.slice(indexLocate);

              const imagePath = `file:///${locateRemoveUnused}`

              const contents = await Filesystem.readFile({
                  path: imagePath,
              });
          }
      }


      async readAsBase64(photo: Photo) {
          const response = await fetch(photo.webPath!);
          const blob = await response.blob();
          return await this.convertBlobToBase64(blob) as string;
      }

      convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
              resolve(reader.result);
          };
          reader.readAsDataURL(blob);
      });
       */

}

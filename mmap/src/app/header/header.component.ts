import { Component, OnInit } from '@angular/core';
import { BackupService } from '../services/backup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( private backupService: BackupService) { }

  ngOnInit() {
  }

  onBackupData(){
    this.DownloadDataFile();
  }

  onFileUpload(event:Event){
    this.LoadDataFile(event.target);
  }

  private DownloadDataFile(){
    var sub = this.backupService.ReadFromLocalStorage().subscribe(
        (textToSave)=>{
            var textToSaveAsBlob = new Blob([JSON.parse(textToSave)], {type:"application/json"});
            var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
            var fileNameToSaveAs = `mindmap-${new Date().getTime()}.json`;
            var downloadLink = document.createElement("a");
            downloadLink.download = fileNameToSaveAs;
            downloadLink.innerHTML = "Download File";
            downloadLink.href = textToSaveAsURL;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
    
            downloadLink.click();
        }).add(()=>{
            sub.unsubscribe();
        });
    
    }

    private LoadDataFile(inputValue:any){
        var file:File = inputValue.files[0];
        var myReader:FileReader = new FileReader();
        myReader.onloadend = (e) => {
            this.backupService.WriteToLocalStorage(JSON.stringify(myReader.result));
        }
        myReader.readAsText(file);
    }
}

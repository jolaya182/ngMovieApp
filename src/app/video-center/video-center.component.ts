import {Video} from "./../video";
import {VideoService} from "./../video.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers: [VideoService]
})
export class VideoCenterComponent implements OnInit {

	videos:Array<Video>; 

	selectedVideo:Video;
	private hidenewVideo:boolean=true;

  constructor(private _videoService: VideoService) { }

  ngOnInit() {
  	this._videoService.getVideos().subscribe( resVideoData => this.videos = resVideoData );
  }

  onSelectVideo(video:any){
  	this.selectedVideo=video;
  	this.hidenewVideo=true;
  	console.log("selectedVideo: ", this.selectedVideo);
  }//eof onselectvideo

  onSubmitAddVideo(video : Video ){

  	this._videoService.addVideo(video).subscribe(  resNewVideo=> { this.videos.push( resNewVideo);
    this.hidenewVideo=true;	console.log("onsubmitVideo");
  	this.selectedVideo=resNewVideo;
  	} );

  }//onSubmitAddVideo

  onUpdateVideoEvent(video : Video ){

    this._videoService.updateVideo(video).subscribe(  resUpdateVideo=> video = resUpdateVideo);
    this.selectedVideo=null; 

  }//onUpdateVideoEvent

  onDeleteVideoEvent(video : Video ){

    let videoArray=this.videos;
    this._videoService.deleteVideo(video).subscribe(  resUpdateVideo=> { 
    for(let i=0; i< videoArray.length; i++ ){
      console.log(1);
      if(videoArray[i]._id === video._id ){
        
        videoArray.splice(i,1);
        }//eof if
      
      }//eof for
    
    });
    this.selectedVideo=null; 

  }//onDeleteVideoEvent

  newVideo(){
  	this.hidenewVideo=false;
  }
}

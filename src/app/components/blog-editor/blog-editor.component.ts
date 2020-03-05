import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphqlService } from 'src/app/services/graphql.service';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-blog-editor',
  templateUrl: './blog-editor.component.html',
  styleUrls: ['./blog-editor.component.scss']
})
export class BlogEditorComponent implements OnInit {

  constructor(
    private graphqlService: GraphqlService,
    private actRoute: ActivatedRoute,
  ) { }

  sub$: Subscription
  imgSrc: string

  blog: Blog
  
  ngOnInit() {
    this.imgSrc = ""

    var id = this.actRoute.snapshot.paramMap.get('id')
    if(id !== null){
      let i = + id
      this.sub$ = this.graphqlService.getBlog(i)
      .subscribe(async query=>{
        this.blog = query.data.blog
        await this.beautify()
      })
    }

    


  }

  beautify(){
    document.getElementById("title").innerText = this.blog.title
    document.getElementById("category").innerText = this.blog.category
    document.getElementById("content").innerText = this.blog.content
  }

  action(val){
    document.execCommand(val)
  }

  onFileChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imgSrc = reader.result;
    //console.log(this.imgSrc)
  }

  updateBlog(){
    let title = document.getElementById("title").innerText
    let category = document.getElementById("category").innerText
    let content = document.getElementById("content").innerText

    console.log(title)
    if(title === ""){
      alert("Title cannot be empty!")
      return
    }else if(category === ""){
      alert("Category cannot be empty!")
      return
    }else if(content === ""){
      alert("Content cannot be empty!")
      return
    }

    this.sub$= this.graphqlService.updateBlog(this.blog.id, title, category, content, this.imgSrc)
    .subscribe(async mutate=>{
      await alert("Blog has been updated")
    })

  }
  createBlog(){
    let title = document.getElementById("title").innerText
    let category = document.getElementById("category").innerText
    let content = document.getElementById("content").innerText


    console.log(title)
    if(title === ""){
      alert("Title cannot be empty!")
      return
    }else if(category === ""){
      alert("Category cannot be empty!")
      return
    }else if(content === ""){
      alert("Content cannot be empty!")
      return
    }

    this.sub$= this.graphqlService.createBlog(title, category, content, this.imgSrc)
    .subscribe(async mutate=>{
      await alert("Blog has been posted")
    })
  }
}

function set_event()
{

    document.getElementById("button_first").addEventListener('click',first_click);
    document.getElementById("button_second").addEventListener('click',second_click);
    document.getElementById("button_third").addEventListener('click',third_click);
    document.getElementById("button_fourth").addEventListener('click',fourth_click);
}

const imgsrc=["images/collage/clouds.jpg","images/collage/road.jpg","images/collage/mountain.jpg",
              "images/collage/face.jpg","images/collage/human.jpg","images/collage/underWater.jpg",
              "images/collage/sea.jpg","images/collage/cup.jpg"];
const my_img=["my_img0","my_img1","my_img2","my_img3","my_img4","my_img5","my_img6","my_img7"];
let id_col=["column1","column2","column3","column4"];
let n=0;
let fl_all=false;
let num=-1;

function first_click()
{
    fl_all=true;
    main_func();
}

function second_click()
{
    num=2;
    main_func();
}

function third_click()
{
    num=3;
    main_func();
}

function fourth_click()
{
   num=4;
   main_func();
}

function main_func()
{
    let x=id_col.length;
    let i;
    for (i=0;i<x;i++)
     {
        let del_elem=document.getElementById(id_col[i]);
        del_elem.parentNode.removeChild(del_elem);
     }
    let coll=document.getElementById("photo_coll");
    if (fl_all)
    {
        for (i=0;i<4;i++)
         {
            let new_col=document.createElement('div');
            new_col.className="column";
            new_col.id="column"+(String)(i+1);
            coll.appendChild(new_col);
            let new_img=document.createElement('img');
            new_img.src=imgsrc[i*2];
            new_img.className="my_img";
            new_col.appendChild(new_img);
            new_img=document.createElement('img');
            new_img.src=imgsrc[i*2+1];
            new_img.className=my_img[i*2+1];
            new_col.appendChild(new_img);
         }
        id_col=["column1","column2","column3","column4"];
        fl_all=false;
    }
    else
    {
        let new_col=document.createElement('div');
        new_col.className="column1";
        new_col.id="column"+(String)(num);
        coll.appendChild(new_col);
        let new_img=document.createElement('img');
        new_img.src=imgsrc[(num-1)*2];
        new_img.className="my_img";
        new_col.appendChild(new_img);
        new_img=document.createElement('img');
        new_img.src=imgsrc[(num-1)*2+1];
        new_img.className=my_img[(num-1)*2+1];
        new_col.appendChild(new_img);
        id_col=["column"+(String)(num)];
    }
}

/*function try_anim()
{
     document.getElementById("check_image").src=imglinks[n];
     //let k=0
     /*for (let i=1;i<100;i++)
    {
        document.getElementById("check_image").opacity=i/100;
    }*//*
     n++;
     if (n==3)
         n=0;
}

function try_remove()
{
    let elem=document.getElementById("check_c1");
    elem.parentNode.removeChild(elem);
    let el=document.getElementById("photo_coll");
    let new_el=document.createElement('div');
    let new_img=document.createElement('img');
    new_img.src="images/collage/cup.jpg";
    new_img.className="my_img";
    new_el.className="column";
    el.insertBefore(new_el,document.getElementById("check_c2"));
    new_el.appendChild(new_img);

}*/

set_event();


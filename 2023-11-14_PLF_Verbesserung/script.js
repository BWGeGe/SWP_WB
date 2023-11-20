
const h2Elements = document.querySelectorAll('div.news-articles  h2');
h2Elements.forEach(h2 => {
  h2.addEventListener('click', (e) => {
    //for the clicked article
    let parents = e.target.parentElement;
    let kids = parents.children;
    let kidsReverse = kids.reverse();
    let clickedHeadLine = kids[0];
    clickedHeadLine.opened = !clickedHeadLine.opened;
    //for all articles
    h2Elements.forEach(parent => {
      if(parent != parents){
        let parOfNews = parent.children;
        parOfNews[0].opened = !parOfNews[0].opened;
        parOfNews[0].opened = false;
        parOfNews[0].style.visibility = 'visible';
        parOfNews[0].style.position = 'static';
        for(let i = parOfNews.length - 1; i > 0; i--){ 
          parOfNews[i].style.visibility = 'hidden';
          parOfNews[i].style.position = 'absolute';
        }
        parent.style.backgroundColor = '#5a8bc4';
        parent.style.color = 'white';
      }
    });
    if(clickedHeadLine.opened==true){
      clickedHeadLine.style.visibility = 'visible';
      clickedHeadLine.style.position = 'static';
      for(let i = kids.length - 1; i > 0; i--){
        parents.removeChild(kids[i]);
        parents.appendChild(kidsReverse[i]+"added");
        kidsReverse[i].style.visibility = 'visible';
        kids[i].style.position = 'static';
      }
    }
  });
}); 

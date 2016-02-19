$(document).ready(function(){

  $('li').click(function(event){
    console.log($(this).attr('rel'));
    var targetClass = "." + $(this).attr('rel');
    $('.content').removeClass('active');
    $(targetClass).addClass('active');
    console.log(this);
  })

});

////searchbar////
////searchbar////



///////navigation/////

var htmlrepos = "";
repos.forEach(function(el) {
  htmlrepos += "<li class='urlName'><a class='urlStyle' href='" + el.url + "'>" + el.name + "</a>"
  +"<a class='langStyle' href='"+ el.languages_url + "'>" + el.language + "</a>"+
  "<span class='octicon octicon-git-branch'>"+el.forks_count+"</span>"+
  "<span class='octicon octicon-star'>"+el.stargazers_count+"</span>"
  +"</li>";
});
$('.repos').html(htmlrepos);

////////
function myMap(array){
 var resUlt= array.map(function(el){
    if (el.type=== "PushEvent"){
    return {
      type:el.type,
      login:el.actor.login,
      reponame:el.repo.name,
      repourl:el.repo.url
    };
}
else if (el.type === 'CreateEvent'){
  return{
    type:el.type,
    login:el.actor.login,
    reponame:el.repo.name,
    repourl:el.repo.url,
    reftype:el.payload.ref_type,
    masTer:el.payload.master_branch
  };

}

else{
  return{
    type:el.type
  };
}

});
return resUlt;
}

var htmlactive ="";

// Activity.forEach(function(el){
//   htmlactive += "<p>"+el.actor.login+"</p>";
//   htmlactive += "<p>"+el.actor.login+"</p>"
// });

var arrayOfActivityStuff = myMap(Activity);
arrayOfActivityStuff.forEach(function(el){


    if(el.type === 'CreateEvent'){
      htmlactive+="<p>" +"<span class='logIn'>"+el.login+"</span>"+ "created a "+ el.reftype+'at'+
      "<a class='logIn' href='"+ el.repourl + ""+ masterBranch +"'>" + el.reponame + "</a></p>";
      /////
      if (el.reftype==="branch") {
        var masterBranch = "<span>"+ el.masTer+"</span>";
      }
      else{
        //donothing///
      }


    }
    else{
      htmlactive +="<p>" + el.login + "pushed a push "+ "</p>";
    }
    //  console.log("REFFY", el.reftype === 'branch');

});


$(".gitactive").html(htmlactive);







// var htmlactivity = "";
// Activity.forEach(function(el){
// htmlactivity += "<li>"+el.actor.login+"created branch"+el.payload.master_branch+"</li>";
//
// });
// $('.gitactive').html(htmlactivity);

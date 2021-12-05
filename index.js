var menuOpen = false
var $bookmarkBtn = $('.bookmarkBtn');
var $bookmarkImg = $bookmarkBtn.children();
var $bookmarkTxt = $bookmarkBtn.find('span')[0]
var bookmarked = false
//modal variables
var $openmodal = $($bookmarkBtn.siblings()[0]);
var $closemodal = $('#closeModal')
var $modalArea = $('.modal');
var $pledgeHidden = $('.pledge-hidden');
var $modalpledgeCard = $('.modal-pledge-card');
var $pledgeHidden = $('.pledge-hidden');
var $pledgeInput = $modalpledgeCard.find('input')
var $contiueBtn = $('.continue-btn');
var $radioBtn = $modalpledgeCard.children().children().children();
var $progressBar = $('.progressMade');
//Tracking variable
var userPledge = 0
var minPledge =1;
var minMet = false
var $activeBtns = $('.active-btn');
var $goalReached = $('.currentReached').html();
var $totalGoal = $('.totalGoal').html();
let currentlVal = parseInt($goalReached.replace('$','').replace(',',''));
var newString = $totalGoal.replaceAll(/\s/g,'').replace("$","").replace(',','').replace('of','').replace('backed','');
var totalGoalVal =parseInt(newString);
var percentReached = ((currentlVal/totalGoalVal)*100);
var $pledgesCount = $('.trackerNum')
var numOfpledges = parseInt($pledgesCount.html().replaceAll(',',''))
//radio
var $radioBtn = $('.radio-in')

function main(){
    //nav menu start
    $('#controlNavMenu').on('click',()=>{
        $('.nav-links').toggleClass('show');
        if(menuOpen === false){
            $('#controlNavMenu').attr('src','images/icon-close-menu.svg');
            menuOpen = true; 
        }else{
            $('#controlNavMenu').attr('src','images/icon-hamburger.svg');
            menuOpen = false;
        }
    })
    //nav menu end

        //progress bar start 
        $('html').css('overflow-y','scroll');

   

    if(percentReached>2){
        $progressBar.css('width',percentReached+'%');
    }else{
        $progressBar.css('width','2%');
    }

    //progress bar end;=
    //changes bookmark buttons
 
    $bookmarkBtn.on('click',()=>{
        if(bookmarked=== false){
            $bookmarkImg.attr('src','images/icon-bookmark-active.svg');
            $bookmarkImg.addClass('bookmarked')
            bookmarked = true
        }else{
            $bookmarkImg.attr('src','images/icon-bookmark.svg');
            $bookmarkImg.removeClass('bookmarked');
            bookmarked = false
        }
    })
    //bookmark end
    //modal controls start
   
   $openmodal.on('click',()=>{

       $modalArea.fadeIn('showModal');
       $('.modal-card').show();
       $('html').css('overflow-y','hidden');
   })
   $closemodal.on('click',()=>{
    $modalArea.fadeOut('showModal');   
    $('html').css('overflow-y','scroll');
    $goalReached = currentlVal;
    $('.pledge-hidden').removeClass('selected');
    $('.modal-pledge-card').css('border', '0.5px solid #ccc');
    $("input").val("");
    $radioBtn.removeClass('select-play-radio')
   });
//switch ative states
   $modalpledgeCard.on('click',event =>{
        $pledgeHidden.removeClass('selected');
        $(event.currentTarget).children().toggleClass('selected');
        minPledge = parseInt($(event.currentTarget).find('span').html().replaceAll(" ","").replace('Pledge','').replace('$','').replace('or more',''));
        $(event.currentTarget).css('border', '3px solid var(--light-bg)');
        $(event.currentTarget).siblings().css('border', '0.5px solid #ccc');
        var $selRadio =$(event.currentTarget).children().children().children().first()
        var $unselRadio = $(event.currentTarget).siblings().children().children().children();
        $selRadio.addClass('select-play-radio');
        $unselRadio.removeClass('select-play-radio');
        $("input").val("")

        return minPledge;
   });
//switch active states end

 
$activeBtns.on('click', event=> {
    $('.modal').fadeIn();
    $('.modal-card').show();
})

//input start
   $pledgeInput.on('keyup', event =>{
       var input = parseInt($(event.currentTarget).val());
       userPledge = input
       if(input < minPledge){
           $(event.currentTarget).css('borderColor','#f44336');
           minMet = false
       }else{
        $(event.currentTarget).css('borderColor','hsl(176, 50%, 47%)');
        minMet=true;
        return minMet
       }
   }).on('blur',event =>{
    var input = parseInt($(event.currentTarget).val());
    userPledge = input
    if(input < minPledge){
        $(event.currentTarget).css('borderColor','#f44336');
        minMet = false
    }else{
     $(event.currentTarget).css('borderColor','hsl(0, 0%, 48%)');
     minMet=true;
     return minMet
    }
   }).on('click',event =>{
    var input = parseInt($(event.currentTarget).val());
    userPledge = input
    if(input > minPledge){
        $(event.currentTarget).css('borderColor','hsl(176, 50%, 47%)');
        minMet = true
    }else{
        $(event.currentTarget).css('borderColor','#f44336');
        minMet = false
    }
   })
//input end
//complete pledge start

$contiueBtn.on('click',event =>{
    if(minPledge <= userPledge){
        //change tracker
        currentlVal+=userPledge;
        $('.currentReached').html('$' +currentlVal);
       percentReached = ((currentlVal/totalGoalVal)*100);
        $progressBar.css('width',percentReached+'%');
        numOfpledges++;
        $pledgesCount.html(numOfpledges);
        //show success
        $('.modal-card').fadeOut();
        $('.success-modal').fadeIn();
        //return to prev state
        $('.pledge-hidden').removeClass('selected');
        $('.modal-pledge-card').css('border', '0.5px solid #ccc');
        $radioBtn.removeClass('select-play-radio');
        $("input").val("");
    }else{
        $(event.currentTarget).css('backgroundColor','#f44336');
        $(event.currentTarget).siblings().css('borderColor','#f44336')
    }
    return $goalReached
}).on('mouseleave',()=>{
    $(event.currentTarget).css('backgroundColor','var(--light-bg)');
    $(event.currentTarget).siblings().css('borderColor','hsl(0, 0%, 48%)')

})

$('.success-modal').find('a').on('click',()=>{
    $('.success-modal').toggle('showModal');
    $modalArea.removeClass('showModal');
    $modalArea.fadeOut('showModal');
    $('html').css('overflow-y','scroll');
})
//complete pledge end
   //modal controls end
   return currentlVal
}

$(document).ready(main);

function setbookmark(){
    if(bookmarked === false){
        document.getElementsByTagName('span')[0].innerHTML = 'Bookmarked';
        isBookmarked = true
    }else{
        document.getElementsByTagName('span')[0].innerHTML = 'Bookmark';
        isBookmarked = false

    }
}

var allChoices = document.getElementsByClassName('pledge-hidden');


function setChoice(choice){
    var myChoice = allChoices[choice];
    myChoice.className = "pledge-hidden selected";
    myChoice.parentElement.style.border = '3px solid var(--light-bg)';
    var radio = myChoice.parentElement.firstElementChild.children[0].children;
    radio[0].classList.add('select-play-radio');

    for(let i = 0; i < allChoices.length; i++){
        if(allChoices[i]!== myChoice){
            allChoices[i].className = "pledge-hidden";
            allChoices[i].parentElement.style.border = "0.5px solid #ccc";
            radio = allChoices[i].parentElement.firstElementChild.children[0].children;
            radio[0].classList.add('select-play-radio');
        }
    }
}
function setRemainer(id){
    var remainding = parseInt(document.getElementById(id).innerHTML);

    if(minPledge <= userPledge){
        remainding--
        document.getElementById(id).innerHTML = remainding
        document.getElementsByClassName(id)[0].innerHTML = remainding
    }
}






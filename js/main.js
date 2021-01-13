function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    let dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    let rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    let ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(dpr, dpr);
    return ctx;
}

// Now this line will be the same size on the page
// but will look sharper on high-DPI devices!
let c = document.querySelector('#my-canvas');
let ctx = setupCanvas(c);
 
let winHeight = c.height;
let winWidth = c.width;
let fontSize = 10;
let color = 'rgb(0,255,0)';
let arrayOfColHeights = [];
let numOfCol = Math.floor(winWidth/fontSize)+1;
let numOfRows = Math.floor(winHeight/fontSize);
let possChars = ['アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムヨメモヤラリルレロワヰヱヲあいうえおかきくけこさしすせそたちつてなにぬねのはひふへほまみむめもやよらりるれろわゐを']
let partyBtn = document.querySelector('#party');
let randomBtn = document.querySelector('#random');
let colorPicker =document.querySelector('#color');
let colorPartyRandom = [color,randomColor(),randomColor()]
let party = -1;

partyBtn.addEventListener('click',(e)=>{
  e.preventDefault;
  partyBtn.classList.add('jump');
  party = 2;
})
randomBtn.addEventListener('click',(e)=>{
  e.preventDefault;
  randomBtn.classList.add('jump');
  color = randomColor();
  colorPicker.value = color;
  party = 1;
})
colorPicker.addEventListener('focus',(e)=>{
  party = 0;
})
  
//set number of slots in Heights Array
for(let i = 0; i < numOfCol; i++){
  arrayOfColHeights[i] = 1;
}
  

function rain(){
  //prints characters from left to right till the end of the row
  for(let i = 0; i < numOfCol; i++){
    if(party == 0){
      ctx.fillStyle= colorPicker.value; 
    }else if(party==1){
      ctx.fillStyle= color;
      
    }else if(party==2){
      colorPicker.value = randomColor();
      ctx.fillStyle= randomColor();
    }else{
      ctx.fillStyle= color;
    }
    
    ctx.fillText(randomChar(),i*fontSize, arrayOfColHeights[i]*fontSize);
    arrayOfColHeights[i]++;
        
    if(arrayOfColHeights[i] > numOfRows && Math.random() > .97){
      arrayOfColHeights[i] = 0;
    }
        
  }
  ctx.fillStyle= 'rgba(0,0,0,.1)'
  ctx.fillRect(0,0,winWidth,winHeight); 
}

setInterval(rain, 70);

//picks a random character from possible characters
function randomChar(){
  return possChars[0][Math.floor(Math.random()*possChars[0].length)]  
}

//return random rgb color
function randomColor(){  
  return rgbToHex(random255(),random255(),random255())
}
//pick random number from 0-255
function random255(){
    return Math.floor(Math.random()*255)
}

//both functions below are helper functions to convert rgb color to hex
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

///////////////////////////////
//  HOROSCOPE FUNCTIONALITY  //
///////////////////////////////

let getInput = document.querySelector('#date');
let getButton = document.querySelector('#get-character');
let birthSection = document.querySelector('#enter-birthday');
let horoscope = document.querySelector('#horoscope');
let horoscopeTitle = document.querySelector('h2');
let horoscopeDesc = document.querySelector('p');
let horoscopeImg = document.querySelector('img');

document.querySelector('form').addEventListener('submit',(e)=>{
  e.preventDefault();
  let date = getInput.value.split("-");
  let num = 0;
  let signs = {
    '01':["Capricorn", "Aquarius",20],
    '02':["Aquarius","Pisces",20],
    '03':["Pisces","Aries",21],
    '04':["Aries","Taurus",21],
    '05':["Taurus","Gemini",21],
    '06':["Gemini","Cancer",21],
    '07':["Cancer","Leo",23],
    '08':["Leo","Virgo",23],
    '09':["Virgo","Libra",23],
    '10':["Libra","Scorpio",23],
    '11':["Scorpio","Sagittarius",23],
    '12':["Sagittarius","Capricorn",22]
  }
  
  descriptions = {
    'Capricorn':['Dozer','https://pbs.twimg.com/media/EBdsRbaXoAAitJq.jpg','Capricorn is a sign that represents time and responsibility, and its representatives are traditional and often very serious by nature. These individuals possess an inner state of independence that enables significant progress both in their personal and professional lives. They are masters of self-control and have the ability to lead the way, make solid and realistic plans, and manage many people who work for them at any time. They will learn from their mistakes and get to the top based solely on their experience and expertise.'],
    'Aquarius':['Neo','https://s2.r29static.com/bin/entry/6bc/x,80/2152911/image.jpg','Aquarius-born are shy and quiet , but on the other hand they can be eccentric and energetic. However, in both cases, they are deep thinkers and highly intellectual people who love helping others. They are able to see without prejudice, on both sides, which makes them people who can easily solve problems. /n Although they can easily adapt to the energy that surrounds them, Aquarius-born have a deep need to be some time alone and away from everything, in order to restore power. People born under the Aquarius sign, look at the world as a place full of possibilities.'],
    'Pisces': ['The Oracle','https://i.pinimg.com/originals/72/79/24/727924150d984e836c3665c5d22e27d3.jpg','Pisces are very friendly, so they often find themselves in a company of very different people. Pisces are selfless, they are always willing to help others, without hoping to get anything back. /n Pisces is a Water sign and as such this zodiac sign is characterized by empathy and expressed emotional capacity.'],
    'Aries': ['Mouse','http://www.geocities.ws/marvelmania2001/mousechair.jpg','As the first sign in the zodiac, the presence of Aries always marks the beginning of something energetic and turbulent. They are continuously looking for dynamic, speed and competition, always being the first in everything - from work to social gatherings. Thanks to its ruling planet Mars and the fact it belongs to the element of Fire (just like Leo and Sagittarius), Aries is one of the most active zodiac signs. It is in their nature to take action, sometimes before they think about it well.'],
    'Taurus': ['Tank','https://img.resized.co/entertainment/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvczMtZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cXFwvZW50ZXJ0YWlubWVudGllXFxcL3VwbG9hZHNcXFwvMjAxOVxcXC8wN1xcXC8xMjEyMTQzNlxcXC9UYW5rLVRoZS1NYXRyaXgtTWFyY3VzLUNob25nLmpwZ1wiLFwid2lkdGhcIjo2NDAsXCJoZWlnaHRcIjozODQsXCJkZWZhdWx0XCI6XCJodHRwczpcXFwvXFxcL2VudGVydGFpbm1lbnQuaWVcXFwvaW1hZ2VzXFxcL25vLWltYWdlLnBuZ1wifSIsImhhc2giOiJjZmVhYTI0OTZiYWQzYzg4NWJlMWM0NDkyYzI5ZjI2NzEyN2IyNjJlIn0=/tank-the-matrix-marcus-chong.jpg','Practical and well-grounded, Taurus is the sign that harvests the fruits of labor. They feel the need to always be surrounded by love and beauty, turned to the material world, hedonism, and physical pleasures. People born with their Sun in Taurus are sensual and tactile, considering touch and taste the most important of all senses. Stable and conservative, this is one of the most reliable signs of the zodiac, ready to endure and stick to their choices until they reach the point of personal satisfaction.'],
    'Gemini': ['Agent Jones','https://www.superherohype.com/assets/uploads/2020/09/The-Matrix-Agent-Johnson-1280x720.jpg','Expressive and quick-witted, Gemini represents two different personalities in one and you will never be sure which one you will face. They are sociable, communicative and ready for fun, with a tendency to suddenly get serious, thoughtful and restless. They are fascinated with the world itself, extremely curious, with a constant feeling that there is not enough time to experience everything they want to see.'],
    'Cancer': ['Trinity','https://cdn.vox-cdn.com/thumbor/cR6Gk1cCmVDFkPRXgaKX572ruAs=/0x0:2538x1042/1200x800/filters:focal(1288x146:1694x552)/cdn.vox-cdn.com/uploads/chorus_image/image/65082247/Trinity.0.jpeg',"Deeply intuitive and sentimental, Cancer can be one of the most challenging zodiac signs to get to know. They are very emotional and sensitive, and care deeply about matters of the family and their home. Cancer is sympathetic and attached to people they keep close. Those born with their Sun in Cancer are very loyal and able to empathize with other people's pain and suffering."],
    'Leo': ['Apoc','https://s3-eu-west-1.amazonaws.com/entertainmentie/uploads/2019/03/26112758/Apoc-Matrix.png','People born under the sign of Leo are natural born leaders. They are dramatic, creative, self-confident, dominant and extremely difficult to resist, able to achieve anything they want to in any area of life they commit to. There is a specific strength to a Leo and their "king of the jungle" status. Leo often has many friends for they are generous and loyal. Self-confident and attractive, this is a Sun sign capable of uniting different groups of people and leading them as one towards a shared cause, and their healthy sense of humor makes collaboration with other people even easier.'],
    'Virgo': ['Agent Brown','https://lh3.googleusercontent.com/proxy/76PB7uh2CCvBu1HJvPeLnrGZjv6lQe7eDXfqMnJsAnGuk_05NLyIpof6-wY-Wg0scyjPCS2qkq0IBAQZaFKG7_K2vRwUxQciAVnzPlnhDrDmJe2AjGjJ1bJPT_1M','Virgos are always paying attention to the smallest details and their deep sense of humanity makes them one of the most careful signs of the zodiac. Their methodical approach to life ensures that nothing is left to chance, and although they are often tender, their heart might be closed for the outer world. This is a sign often misunderstood, not because they lack the ability to express, but because they won’t accept their feelings as valid, true, or even relevant when opposed to reason. The symbolism behind the name speaks well of their nature, born with a feeling they are experiencing everything for the first time.'],
    'Libra': ['Agent Smith','https://static.highsnobiety.com/thumbor/VwRPysiJq-xG6yY-6EZ2BlMyK9o=/1200x720/static.highsnobiety.com/wp-content/uploads/2020/01/22103235/agent-smith-the-matrix-4-00.jpg','People born under the sign of Libra are peaceful, fair, and they hate being alone. Partnership is very important for them, as their mirror and someone giving them the ability to be the mirror themselves. These individuals are fascinated by balance and symmetry, they are in a constant chase for justice and equality, realizing through life that the only thing that should be truly important to themselves in their own inner core of personality. This is someone ready to do nearly anything to avoid conflict, keeping the peace whenever possible.'],
    'Scorpio': ['Morpheus','https://www.denofgeek.com/wp-content/uploads/2020/08/the-matrix-4-morpheus.jpg?fit=1200%2C675','Scorpio-born are passionate and assertive people. They are determined and decisive, and will research until they find out the truth. Scorpio is a great leader, always aware of the situation and also features prominently in resourcefulness. /n Scorpio is a Water sign and lives to experience and express emotions. Although emotions are very important for Scorpio, they manifest them differently than other water signs. In any case, you can be sure that the Scorpio will keep your secrets, whatever they may be.'],
    'Sagittarius': ['Cypher','https://static2.srcdn.com/wordpress/wp-content/uploads/2020/04/Joe-Pantoliano-as-Cypher-in-The-Matrix-1999.jpg','Curious and energetic, Sagittarius is one of the biggest travelers among all zodiac signs. Their open mind and philosophical view motivates them to wander around the world in search of the meaning of life. /n Sagittarius is extrovert, optimistic and enthusiastic, and likes changes. Sagittarius-born are able to transform their thoughts into concrete actions and they will do anything to achieve their goals.']
  }
  if(date[2]< signs[date[1]][2]){
    num = 0;
  }else{
    num = 1;
  }
  let sign = signs[date[1]][num]
  horoscopeTitle.innerHTML = `You Are: ${descriptions[sign][0]} (${sign})`;
  horoscopeDesc.innerHTML = descriptions[sign][2];
  horoscopeImg.src = descriptions[sign][1];
  
  getButton.classList.add('jump')
  console.log(date)
  birthSection.style.left = "20%";
  horoscope.style.top = "0"
})
document.querySelector('.animate').addEventListener('transitionend', () =>{
  partyBtn.classList.remove('jump');
  randomBtn.classList.remove('jump');
  getButton.classList.remove('jump');
})
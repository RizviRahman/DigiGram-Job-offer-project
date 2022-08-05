 const cardlist = document.querySelectorAll('.card__inner');


let chemicalcheck = true
let chemical1check = true
chemical = document.getElementById('chemical')
chemical.addEventListener('click', function(){
  if(footprintcheck && watercheck && wastecheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Petrochemical & Chemical</h2>
</div>
<div class="card__body">
  <p><strong>- Installation Management</strong></p>
<p><strong>- Biomass</strong></p>
<p><strong>- Construction</strong></p>
<p><strong>- Environmental Safety</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    chemicalcheck = false
  },100)
  chemical1check = false
  }
  else{
    setTimeout(()=>{
      green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Petrochemical & Chemical</h2>
</div>
<div class="card__body">
  <p><strong>- Installation Management</strong></p>
<p><strong>- Biomass</strong></p>
<p><strong>- Construction</strong></p>
<p><strong>- Environmental Safety</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    chemicalcheck = false
  },100)
    },700)
    chemical1check = false
  }
})



let renewablecheck = true
let renewable1check = true
renewable = document.getElementById('renewable')
renewable.addEventListener('click', function(){
  if(footprintcheck && watercheck && wastecheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Renewable Energy</h2>
</div>
<div class="card__body1">
  <p><strong>- Hydrogen</strong></p>
<p><strong>- Wind Turbine</strong></p>
<p><strong>- Solar</strong></p>
<p><strong>- Marine</strong></p>
<p><strong>- Geothermal</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    renewablecheck = false
  },100)
  renewable1check = false
  }
  else{
    setTimeout(()=>{
      green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Renewable Energy</h2>
</div>
<div class="card__body1">
  <p><strong>- Hydrogen</strong></p>
<p><strong>- Wind Turbine</strong></p>
<p><strong>- Solar</strong></p>
<p><strong>- Marine</strong></p>
<p><strong>- Geothermal</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    renewablecheck = false
  },100)
    },700)
    renewable1check = false
  }
    
})



let oilcheck = true
let oil1check = true
oil = document.getElementById('oil')
oil.addEventListener('click', function(){
  if(footprintcheck && watercheck && wastecheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Oil & Gas</h2>
</div>
<div class="card__body">
  <p><strong>- Onshore/Offshore</strong></p>
<p><strong>- Subsea</strong></p>
<p><strong>- Refining</strong></p>
<p><strong>- Distribution</strong></p>
<p><strong>- Transport</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    oilcheck = false
  },100)
  oil1check = false
  }
  else{
    setTimeout(()=>{
      green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Oil & Gas</h2>
</div>
<div class="card__body">
  <p><strong>- Onshore/Offshore</strong></p>
<p><strong>- Subsea</strong></p>
<p><strong>- Refining</strong></p>
<p><strong>- Distribution</strong></p>
<p><strong>- Transport</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    oilcheck = false
  },100)
    },700)
    oil1check = false
  }
})


let nuclearcheck = true
let nuclear1check = true
nuclear = document.getElementById('nuclear')
nuclear.addEventListener('click', function(){
  if(footprintcheck && watercheck && wastecheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Nuclear</h2>
</div>
<div class="card__body">
  <p><strong>- Prod. Electricity</strong></p>
<p><strong>- Infrastructure</strong></p>
<p><strong>- Waste</strong></p>
<p><strong>- Security</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    nuclearcheck = false
  },100)
  nuclear1check = false
  }
  else{
    setTimeout(()=>{
      green = document.getElementById('green')
  green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Nuclear</h2>
</div>
<div class="card__body">
  <p><strong>- Prod. Electricity</strong></p>
<p><strong>- Infrastructure</strong></p>
<p><strong>- Waste</strong></p>
<p><strong>- Security</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[0].classList.add('is-flipped');
    nuclearcheck = false
  },100)
    }, 700)
    nuclear1check = false
  }
})


let footprintcheck = true
let footprint1check = true
footprint = document.getElementById('footprint')
footprint.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Environment Footprint</h2>
</div>
<div class="card__body">
  <p><strong>- Carbon</strong></p>
<p><strong>- Biodiversity</strong></p>
<p><strong>- Water</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[1].classList.add('is-flipped');
    footprintcheck = false
  },100)
  footprint1check = false
  }
  else{
    setTimeout(()=>{
      blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Environment Footprint</h2>
</div>
<div class="card__body">
  <p><strong>- Carbon</strong></p>
<p><strong>- Biodiversity</strong></p>
<p><strong>- Water</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[1].classList.add('is-flipped');
    footprintcheck = false
  },100)
    },700)
    footprint1check = false
  }
})




let watercheck = true
let water1check = true
water = document.getElementById('water')
water.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Water Treatment</h2>
</div>
<div class="card__body">
  <p><strong>- Supply Management</strong></p>
<p><strong>- Network Management</strong></p>
<p><strong>- Management of Industrial Effluences</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[1].classList.add('is-flipped');
    watercheck = false
  },100)
  water1check = false
  }
  else{
    setTimeout(()=>{
      blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Water Treatment</h2>
</div>
<div class="card__body">
  <p><strong>- Supply Management</strong></p>
<p><strong>- Network Management</strong></p>
<p><strong>- Management of Industrial Effluences</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[1].classList.add('is-flipped');
    watercheck = false
  },100)
    },700)
    water1check = false
  }
})


let wastecheck = true
let waste1check = true
waste = document.getElementById('waste')
waste.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && productioncheck && cybercheck && informaticcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Waste Treatment</h2>
</div>
<div class="card__body">
  <p><strong>- Convert Waste</strong></p>
<p><strong>- Maintenance and Cleaning</strong></p>
<p><strong>- Processing and Storage</strong></p>
<p><strong>- Hazardous Waste &nbsp;Management</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[1].classList.add('is-flipped');
    wastecheck = false
  },100)
  waste1check = false
  }
  else{
    setTimeout(()=>{
      blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Waste Treatment</h2>
</div>
<div class="card__body">
  <p><strong>- Convert Waste</strong></p>
<p><strong>- Maintenance and Cleaning</strong></p>
<p><strong>- Processing and Storage</strong></p>
<p><strong>- Hazardous Waste &nbsp;Management</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[1].classList.add('is-flipped');
    wastecheck = false
  },100)
    },700)
    waste1check = false
  }
})



let productioncheck = true
let production1check = true
production = document.getElementById('production')
production.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Infrastructure Production</h2>
</div>
<div class="card__body">
  <p><strong>- Big Data</strong></p>
<p><strong>- Business Intelligence</strong></p>
<p><strong>- Architect</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[2].classList.add('is-flipped');
    productioncheck = false
  },100)
  production1check = false
  }
  else{
    setTimeout(()=>{
      silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Infrastructure Production</h2>
</div>
<div class="card__body">
  <p><strong>- Big Data</strong></p>
<p><strong>- Business Intelligence</strong></p>
<p><strong>- Architect</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[2].classList.add('is-flipped');
    productioncheck = false
  },100)
    },700)
    production1check = false
  }
})


let cybercheck = true
let cyber1check = true
cyber = document.getElementById('cyber')
cyber.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Cybersecurity</h2>
</div>
<div class="card__body">
  <p><strong>- International Trade</strong></p>
<p><strong>- Edge Computing</strong></p>
<p><strong>- Logistics</strong></p>
<p><strong>- Industrial IoT</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[2].classList.add('is-flipped');
    cybercheck = false
  },100)
  cyber1check = false
  }
  else{
    setTimeout(()=>{
      silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Cybersecurity</h2>
</div>
<div class="card__body">
  <p><strong>- International Trade</strong></p>
<p><strong>- Edge Computing</strong></p>
<p><strong>- Logistics</strong></p>
<p><strong>- Industrial IoT</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[2].classList.add('is-flipped');
    cybercheck = false
  },100)
    },700)
    cyber1check = false
  }
})


let informaticcheck = true
let informatic1check = true
informatic = document.getElementById('informatic')
informatic.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && constructioncheck && buildingcheck && railwaycheck && navalcheck && card1 && card2 && card3 && card4){
    silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Informatic</h2>
</div>
<div class="card__body">
  <p><strong>- Full Stack Development</strong></p>
<p><strong>- Moe/Moa</strong></p>
<p><strong>- Software Development</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[2].classList.add('is-flipped');
    informaticcheck = false
  },100)
  informatic1check = false
  }
  else{
    setTimeout(()=>{
      silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Informatic</h2>
</div>
<div class="card__body">
  <p><strong>- Full Stack Development</strong></p>
<p><strong>- Moe/Moa</strong></p>
<p><strong>- Software Development</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[2].classList.add('is-flipped');
    informaticcheck = false
  },100)
    },700)
    informatic1check = false
  }
})


let constructioncheck = true
let construction1check = true
construction = document.getElementById('construction')
construction.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && productioncheck && cybercheck && informaticcheck && card1 && card2 && card3 && card4){
    orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Construction</h2>
</div>
<div class="card__body">
  <p><strong>- Heavy Industry</strong></p>
<p><strong>- Structures</strong></p>
<p><strong>- Hydraulics</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    constructioncheck = false
  },100)
  construction1check = false
  }
  else{
    setTimeout(()=>{
      orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Construction</h2>
</div>
<div class="card__body">
  <p><strong>- Heavy Industry</strong></p>
<p><strong>- Structures</strong></p>
<p><strong>- Hydraulics</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    constructioncheck = false
  },100)
    },700)
    construction1check = false
  }
})


let buildingcheck = true
let building1check = true
building = document.getElementById('building')
building.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && productioncheck && cybercheck && informaticcheck && card1 && card2 && card3 && card4){
    orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Building</h2>
</div>
<div class="card__body">
  <p><strong>- Industrial</strong></p>
<p><strong>- Tertiary</strong></p>
<p><strong>- Environment</strong></p>
<p><strong>- Maritime</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    buildingcheck = false
  },100)
  building1check = false
  }
  else{
    setTimeout(()=>{
      orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Building</h2>
</div>
<div class="card__body">
  <p><strong>- Industrial</strong></p>
<p><strong>- Tertiary</strong></p>
<p><strong>- Environment</strong></p>
<p><strong>- Maritime</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    buildingcheck = false
  },100)
    },700)
    building1check = false
  }
})


let railwaycheck = true
let railway1check = true
railway = document.getElementById('railway')
railway.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && productioncheck && cybercheck && informaticcheck && card1 && card2 && card3 && card4){
    orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Railway</h2>
</div>
<div class="card__body">
  <p><strong>- Infrastructure</strong></p>
<p><strong>- Heavy (Ter, Tet, Tgv..)</strong></p>
<p><strong>- Guided Urban (Tramway, Metro…)</strong></p>
<p><strong>- Administrator</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    railwaycheck = false
  },100)
  railway1check = false
  }
  else{
    setTimeout(()=>{
      orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Railway</h2>
</div>
<div class="card__body">
  <p><strong>- Infrastructure</strong></p>
<p><strong>- Heavy (Ter, Tet, Tgv..)</strong></p>
<p><strong>- Guided Urban (Tramway, Metro…)</strong></p>
<p><strong>- Administrator</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    railwaycheck = false
  },100)
    },700)
    railway1check = false
  }
})


let navalcheck = true
let naval1check = true
naval = document.getElementById('naval')
naval.addEventListener('click', function(){
  if(chemicalcheck && renewablecheck && oilcheck && nuclearcheck && watercheck && wastecheck && footprintcheck && productioncheck && cybercheck && informaticcheck && card1 && card2 && card3 && card4){
    orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Naval</h2>
</div>
<div class="card__body">
  <p><strong>- Submarine</strong></p>
<p><strong>- Systems</strong></p>
<p><strong>- Equipment</strong></p>
<p><strong>- Geotech</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    navalcheck = false
  },100)
  naval1check = false
  }
  else{
    setTimeout(()=>{
      orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Naval</h2>
</div>
<div class="card__body">
  <p><strong>- Submarine</strong></p>
<p><strong>- Systems</strong></p>
<p><strong>- Equipment</strong></p>
<p><strong>- Geotech</strong></p>
</div>`
  setTimeout(()=>{
    cardlist[3].classList.add('is-flipped');
    navalcheck = false
  },100)
    },700)
    naval1check = false
  }
})



let card1 = true
cardlist[0].addEventListener("click", function (e) {
  if(chemical1check && renewable1check && oil1check && nuclear1check && card1){
    green = document.getElementById('green')
    green.innerHTML = `<div class="card__header1">
  <i class="fa fa-flash"></i>
  <h2>Oil & Gas</h2>
</div>
<div class="card__body">
  <p><strong>- Onshore/Offshore</strong></p>
<p><strong>- Subsea</strong></p>
<p><strong>- Refining</strong></p>
<p><strong>- Distribution</strong></p>
<p><strong>- Transport</strong></p>
</div>`
    setTimeout(()=>{
      cardlist[0].classList.add('is-flipped');
      card1 = false
    },100)
  }
});


let card2 = true
cardlist[1].addEventListener("click", function (e) {
  if(footprint1check && waste1check && water1check && card2){
    blue = document.getElementById('blue')
  blue.innerHTML = `<div class="card__header2">	
  <i class="fa fa-recycle"></i>
  <h2>Water Treatment</h2>
  </div>
  <div class="card__body">
    <p><strong>- Supply Management</strong></p>
  <p><strong>- Network Management</strong></p>
  <p><strong>- Management of Industrial Effluences</strong></p>
  </div>`
    
    setTimeout(()=>{
      cardlist[1].classList.toggle('is-flipped');
      card2 = false
    },100)
  }
});


let card3 = true
cardlist[2].addEventListener("click", function (e) {
  if(production1check && cyber1check && informatic1check && card3){
    silver = document.getElementById('silver')
  silver.innerHTML = `<div class="card__header3">	
  <i class="fa fa-laptop"></i>
  <h2>Cybersecurity</h2>
  </div>
  <div class="card__body">
    <p><strong>- International Trade</strong></p>
  <p><strong>- Edge Computing</strong></p>
  <p><strong>- Logistics</strong></p>
  <p><strong>- Industrial IoT</strong></p>
  </div>`
    
    setTimeout(()=>{
      cardlist[2].classList.toggle('is-flipped');
      card3 = false
    },100)
  }
});


let card4 = true
cardlist[3].addEventListener("click", function (e) {
  if(construction1check && building1check && railway1check && naval1check && card4){
    orange = document.getElementById('orange')
  orange.innerHTML = `<div class="card__header">	
  <i class='fa fa-solid fa-helmet-safety'></i>
  <h2>Construction</h2>
  </div>
  <div class="card__body">
    <p><strong>- Heavy Industry</strong></p>
  <p><strong>- Structures</strong></p>
  <p><strong>- Hydraulics</strong></p>
  </div>`
    
    setTimeout(()=>{
      cardlist[3].classList.toggle('is-flipped');
      card4 = false
    },100)
  }
});


document.addEventListener('click', function(){
  if(!chemicalcheck || !renewablecheck || !oilcheck || !nuclearcheck || !card1){
    cardlist[0].classList.remove('is-flipped')
    chemicalcheck = true
    chemical1check = true
    renewablecheck = true
    renewable1check = true
    oilcheck =true
    oil1check =true
    nuclearcheck = true
    nuclear1check = true
    card1 = true
  }
  if(!footprintcheck || !watercheck || !wastecheck || !card2){
    cardlist[1].classList.remove('is-flipped')
    footprintcheck = true
    watercheck = true
    wastecheck = true
    footprint1check = true
    water1check = true
    waste1check = true
    card2 = true
  }
  if(!productioncheck || !cybercheck || !informaticcheck || !card3){
    cardlist[2].classList.remove('is-flipped')
    productioncheck = true
    cybercheck = true
    informaticcheck = true
    production1check = true
    cyber1check = true
    informatic1check = true
    card3 = true
  }
  if(!constructioncheck || !buildingcheck || !railwaycheck || !navalcheck || !card4){
    cardlist[3].classList.remove('is-flipped')
    constructioncheck = true
    buildingcheck = true
    railwaycheck = true
    navalcheck = true
    construction1check = true
    building1check = true
    railway1check = true
    naval1check = true
    card4 = true
  }
})
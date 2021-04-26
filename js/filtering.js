
var Filters = {"stars": "int","price": "real","pool": "str","pet": "str","kids": "str","wifi": "str"};

// ---- filter func ---- //
	function filteringFunction() {
	  map.eachLayer(function(lyr){
	  if ("options" in lyr && "dataVar" in lyr["options"]){
		features = this[lyr["options"]["dataVar"]].features.slice(0);
		try{
		  for (key in Filters){
			keyS = key.replace(/[^a-zA-Z0-9_]/g, "")
			if (Filters[key] == "str"){
			  var selection = [];
			  var options = document.getElementById("sel_" + keyS).options
			  for (var i=0; i < options.length; i++) {
				if (options[i].selected) selection.push(options[i].value);
			  }
				try{
				  if (key in features[0].properties){
					for (i = features.length - 1;
					  i >= 0; --i){
					  if (selection.indexOf(
					  features[i].properties[key])<0
					  && selection.length>0) {
					  features.splice(i,1);
					  }
					}
				  }
				} catch(err){
			  }
			}
			if (Filters[key] == "int"){
			  sliderVals =  document.getElementById(
				"div_" + keyS).noUiSlider.get();
			  try{
				if (key in features[0].properties){
				for (i = features.length - 1; i >= 0; --i){
				  if (parseInt(features[i].properties[key])
					  < sliderVals[0]
					  || parseInt(features[i].properties[key])
					  > sliderVals[1]){
						features.splice(i,1);
					  }
					}
				  }
				} catch(err){
				}
			  }
			if (Filters[key] == "real"){
			  sliderVals =  document.getElementById(
				"div_" + keyS).noUiSlider.get();
			  try{
				if (key in features[0].properties){
				for (i = features.length - 1; i >= 0; --i){
				  if (features[i].properties[key]
					  < sliderVals[0]
					  || features[i].properties[key]
					  > sliderVals[1]){
						features.splice(i,1);
					  }
					}
				  }
				} catch(err){
				}
			  }
		  }
		} catch(err){
		}
	  this[lyr["options"]["layerName"]].clearLayers();
	  this[lyr["options"]["layerName"]].addData(features);
	// var i = 0;
	// layer_Hotels_1.eachLayer(function(layer) {
		// var context = {
			// feature: layer.feature,
			// variables: {}
		// };
		
		// layer.bindTooltip((exp_label_Hotels_1_eval_expression(context) !== null?String('<div style="color: #0000e4; font-size: 12pt; font-weight: bold; font-family: \'Lato Black\', sans-serif;">' + exp_label_Hotels_1_eval_expression(context)) + '</div>':''), {permanent: true, offset: [-0, -16], className: 'css_Hotels_1'});
		// labels.push(layer);
		// totalMarkers += 1;
		  // layer.added = true;
		  // addLabel(layer, i);
		  // i++;
	// });
	  }
	  })
	}
	// ------------------------------------- //



	///// --- Label - filter --- ////
	document.getElementById("menu").appendChild(document.createElement("div"));
	var filter_label =  document.createElement('div');
	filter_label.innerHTML = "מסננים";
	filter_label.style.fontSize="35px";
	filter_label.style.fontWeight="bold";
	filter_label.style.color = "#191970";
	filter_label.style.margin="20px 10px";
	document.getElementById("menu").appendChild(filter_label);
	// ------------------------------------- //


		
	///// --- Price per night - filter --- ////
	document.getElementById("menu").appendChild(document.createElement("div"));
	var div_price = document.createElement("div");
	var price_label = document.createElement('div');
	price_label.innerHTML = '<span>מחיר ללילה</span>';
	price_label.style.margin="0px 20px";
	document.getElementById("menu").appendChild(price_label);
	div_price.id = "div_price";
	div_price.className = "Slider";
	div_price.style.width="80%";
	div_price.style.margin="auto";
	document.getElementById("menu").appendChild(div_price);
	var lab_price = document.createElement('div');
	lab_price.innerHTML  = '<span id="val_price"></span>';
	lab_price.className = 'filterlabel';
	lab_price.style.textAlign = 'center';
	lab_price.style.direction = 'ltr';
	document.getElementById("menu").appendChild(lab_price);
	var reset_price = document.createElement('div');
	reset_price.className = 'filterlabel';
	lab_price.className = 'filterlabel';
	reset_price.onclick = function() {
		sel_price.noUiSlider.reset();
	};
	document.getElementById("menu").appendChild(reset_price);
	var sel_price = document.getElementById('div_price');
	noUiSlider.create(sel_price, {
		connect: true,
		start: [228.0, 5985.99],
		range: {
		min: 228.0,
		max: 5985.99
		}
	});
	sel_price.noUiSlider.on('update', function (values) {
	val_price = document.getElementById('val_price');
	val_price.innerHTML = values.join(' - ');
	val_price.style.fontSize= "17px";
	
		filteringFunction()
	});
	// ------------------------------------- //

   
	//// --- stars - filter --- ////
	var count;
	var rank_label = document.createElement('div');
	rank_label.innerHTML = '<span></span>';
	rank_label.style.margin="130px 15px 20px 150px";
	document.getElementById("menu").appendChild(rank_label);
	document.getElementById("menu").appendChild(document.createElement("div"));
	var div_stars = document.createElement("div");
	div_stars.id = "div_stars";
	div_stars.className = "slider";
	document.getElementById("menu").appendChild(div_stars);
	div_stars.hidden=true;
	var lab_stars = document.createElement('div');
	lab_stars.innerHTML  = 'כוכבים: <span id="val_stars"></span>';
	document.getElementById("menu").appendChild(lab_stars);
	lab_stars.hidden=true;
	var sel_stars = document.getElementById('div_stars');
	noUiSlider.create(sel_stars, {connect: true, start: [1, 5], step: 1, format: wNumb({decimals: 0,}),range: {min: 1,max: 5}});
	// star marking
	function starmark(item)
	{
		count=item.id[0];
		sessionStorage.starRating = count;
		var subid= item.id.substring(1);
		for(var i=0;i<5;i++)
		{
		if(i<count)
			{ document.getElementById((i+1)+subid).style.color="orange";}
		else {
		document.getElementById((i+1)+subid).style.color="black";}
		}		
		sel_stars.noUiSlider.set([count, "5"]);
	}
	sel_stars.noUiSlider.on('update', function (values) {
	filterVals =[];
	for (value in values){
	filterVals.push(parseInt(value))
	}
	val_stars = document.getElementById('val_stars');
	val_stars.innerHTML = values.join(' - ');
		filteringFunction()
	});
	
	
	function starreset()
	{
		for(var i=0;i<5;i++) {
			document.getElementById((i+1)+"one").style.color="black";
		}		
	}
	// ------------------------------------- //
	
	
	
	////---- pool - filter ---- /////
	document.getElementById("menu").appendChild(document.createElement("div"));
	var div_pool = document.createElement('div');
	div_pool.id = "div_pool";
	div_pool.className= "filterselect";
	document.getElementById("menu").appendChild(div_pool);
	div_pool.hidden = true;
	sel_pool = document.createElement('select');
	sel_pool.multiple = true;
	sel_pool.size = 2;
	sel_pool.id = "sel_pool";
	var pool_options_str = "<option value='' unselected></option>";
	sel_pool.onchange = function(){filteringFunction()};
	pool_options_str  += '<option value="כן">כן</option>';
	pool_options_str  += '<option value="לא">לא</option>';
	sel_pool.innerHTML = pool_options_str;
	div_pool.appendChild(sel_pool);
	//create checkbox
	var pool_checkbox = document.createElement("INPUT");
	pool_checkbox.type = 'checkbox';
	pool_checkbox.id = "pool_checkbox";
	pool_checkbox.style.margin="0px 25px";
	document.getElementById("menu").appendChild(pool_checkbox);
	//Action - update
	pool_checkbox.onchange = function(){
		var options = document.getElementById("sel_pool").options;
		if (pool_checkbox.checked == true){
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = false;
		}
		else {
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = true;
		}
		filteringFunction();
	};
	div_pool.appendChild(sel_pool);
	//label
	var pool_label = document.createElement('label').appendChild(document.createTextNode('בריכת שחיה'));
	document.getElementById('menu').appendChild(pool_label);
	// ------------------------------------- //
	
	
	
	
	////---- pet friendly - filter ---- /////
	document.getElementById("menu").appendChild(document.createElement("div"));
	var div_pet = document.createElement('div');
	div_pet.id = "div_pet";
	div_pet.className= "filterselect";
	document.getElementById("menu").appendChild(div_pet);
	sel_pet = document.createElement('select');
	sel_pet.multiple = true;
	sel_pet.size = 2;
	sel_pet.id = "sel_pet";
	var pet_options_str = "<option value='' unselected></option>";
	sel_pet.onchange = function(){filterFunc()};
	pet_options_str  += '<option value="כן">כן</option>';
	pet_options_str  += '<option value="לא">לא</option>';
	sel_pet.innerHTML = pet_options_str;
	div_pet.appendChild(sel_pet);
	//create checkbox
	var pet_checkbox = document.createElement("INPUT");
	pet_checkbox.type = 'checkbox';
	pet_checkbox.id = "pet_checkbox";
	pet_checkbox.style.margin="0px 25px";
	document.getElementById("menu").appendChild(pet_checkbox);
	//Action - update
	pet_checkbox.onchange = function(){
		var options = document.getElementById("sel_pet").options;
		if (pet_checkbox.checked == true){
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = false;
		}
		else {
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = true;
		}
		filteringFunction();
	};
	div_pool.appendChild(sel_pet);
	//label
	var pet_label = document.createElement('label').appendChild(document.createTextNode('ידידותי לבעלי חיים'));
	document.getElementById('menu').appendChild(pet_label);
	// ------------------------------------- //
	
	
	
	
	////---- kids friendly - filter ---- /////
	document.getElementById("menu").appendChild(document.createElement("div"));
	var div_kids = document.createElement('div');
	div_kids.id = "div_kids";
	div_kids.className= "filterselect";
	document.getElementById("menu").appendChild(div_kids);
	sel_kids = document.createElement('select');
	sel_kids.multiple = true;
	sel_kids.size = 2;
	sel_kids.id = "sel_kids";
	var kids_options_str = "<option value='' unselected></option>";
	sel_kids.onchange = function(){filterFunc()};
	kids_options_str  += '<option value="כן">כן</option>';
	kids_options_str  += '<option value="לא">לא</option>';
	sel_kids.innerHTML = kids_options_str;
	div_kids.appendChild(sel_kids);
	//create checkbox
	var kids_checkbox = document.createElement("INPUT");
	kids_checkbox.type = 'checkbox';
	kids_checkbox.id = "kids_checkbox";
	kids_checkbox.style.margin="0px 25px";
	document.getElementById("menu").appendChild(kids_checkbox);
	//Action - update
	kids_checkbox.onchange = function(){
		var options = document.getElementById("sel_kids").options;
		if (kids_checkbox.checked == true){
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = false;
		}
		else {
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = true;
		}
		filteringFunction();
	};
	div_pool.appendChild(sel_kids);
	//label
	var kids_label = document.createElement('label').appendChild(document.createTextNode('מתאים לילדים'));
	document.getElementById('menu').appendChild(kids_label);
	// ------------------------------------- //
	
	
	
	
		////---- free_WIFI - filter ---- /////
	document.getElementById("menu").appendChild(document.createElement("div"));
	var div_wifi = document.createElement('div');
	div_wifi.id = "div_wifi";
	div_wifi.className= "filterselect";
	document.getElementById("menu").appendChild(div_wifi);
	sel_wifi = document.createElement('select');
	sel_wifi.multiple = true;
	sel_wifi.size = 2;
	sel_wifi.id = "sel_wifi";
	var wifi_options_str = "<option value='' unselected></option>";
	sel_wifi.onchange = function(){filterFunc()};
	wifi_options_str  += '<option value="כן">כן</option>';
	wifi_options_str  += '<option value="לא">לא</option>';
	sel_wifi.innerHTML = wifi_options_str;
	div_wifi.appendChild(sel_wifi);
	//create checkbox
	var wifi_checkbox = document.createElement("INPUT");
	wifi_checkbox.type = 'checkbox';
	wifi_checkbox.id = "wifi_checkbox";
	wifi_checkbox.value = 'wifi';
	wifi_checkbox.style.margin="0px 25px";
	document.getElementById("menu").appendChild(wifi_checkbox);
	//Action - update
	wifi_checkbox.onchange = function(){
		var options = document.getElementById("sel_wifi").options;
		if (wifi_checkbox.checked == true){
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = false;
		}
		else {
			options[0].selected = false;
			options[1].selected = true;
			options[2].selected = true;
		}
		filteringFunction();
	};
	div_pool.appendChild(sel_wifi);
	//label
	var wifi_label = document.createElement('label').appendChild(document.createTextNode('WIFI חינם'));
	document.getElementById('menu').appendChild(wifi_label);
	// ------------------------------------- //
	
	
	
	// General - design
	document.getElementById('menu').style.fontSize="25px";
	//document.getElementById('menu').style.fontFamily = "cursive";
	document.getElementById('menu').style.fontFamily = "Calibri Light";
	
	// Reset filters
	document.getElementById("menu").appendChild(document.createElement("div"));
	var btnResetFilters = document.createElement("BUTTON");
	btnResetFilters.innerHTML = "אפס סינונים";
	btnResetFilters.style.borderRadius = "12px";
	btnResetFilters.style.color = "White";
	btnResetFilters.style.backgroundColor="#3FB8AF";
	btnResetFilters.style.height="35px";
	btnResetFilters.style.width="150px";
	btnResetFilters.style.margin="20px 20px";
	btnResetFilters.style.borderColor ="transparent";
	document.getElementById("menu").appendChild(btnResetFilters);
	btnResetFilters.style.fontSize="23px";
	btnResetFilters.style.fontFamily = "Calibri Light";
	btnResetFilters.onclick = function() {
		//reset price
		sel_price.noUiSlider.reset();
		//reset pool
		pool_checkbox.checked = false;
		var options_pool = document.getElementById("sel_pool").options;
		options_pool[1].selected = true;
		options_pool[2].selected = true;
		//reset pet
		pet_checkbox.checked = false;
		var options_pet = document.getElementById("sel_pet").options;
		options_pet[1].selected = true;
		options_pet[2].selected = true;
		//reset kids
		kids_checkbox.checked = false;
		var options_kids = document.getElementById("sel_kids").options;
		options_kids[1].selected = true;
		options_kids[2].selected = true;
		//reset wifi
		wifi_checkbox.checked = false;
		var options_wifi = document.getElementById("sel_wifi").options;
		options_wifi[1].selected = true;
		options_wifi[2].selected = true;
		//reset stars
		sel_stars.noUiSlider.set(["1", "5"]);
		starreset();
	}
	
	
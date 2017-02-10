function(){

  function Facade(){

    var HOSPITAL_URL = "/api/hospitals";
    var DOCTOR_URL = "/api/doctors";

    function getAllHospitals(){
      return $.get(HOSPITAL_URL)
    }
    function getAllDoctors(){
      return $.get(DOCTOR_URL)
    }

    function getItem(itemId){
      return $.get(HOSPITAL_URL + "/" + itemId);
    }
    function getItem(itemId){
      return $.get(HOSPITAL_URL + "/" + itemId);
    }

    /*function addNewItem(text, urgency){
      var item = {
        "text": text,
        "urgency": urgency,
        "isDone": false
      }*/
    function addNewHospital(text){
      var item = {
        
      }

      return $.ajax( {
        url:HOSPITAL_URL,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(item)
      });
    }
    
    function addNewObj(api_url, tmethod, obj){
    	console.log("add new obj was called");
       $.ajax( {
        url:api_url,
        method: tmethod,
        contentType: "application/json",
        data: JSON.stringify(obj)
      });
      return false;
    }
    
     function updateObj(api_url, tmethod, obj){
      return $.ajax( {
        url:api_url,
        method: tmethod,
        contentType: "application/json",
        data: JSON.stringify(obj)
      });
    }

    /*function updateItem(id, text, urgency){
      var item = {
        "text": text,
        "urgency": urgency
      }*/
    function updateItem(id, text){
      var item = {
        "text": text
      }

      return $.ajax( {
        url:HOSPITAL_URL + "/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(item)
      });
    }

    function markItemDone(id, state){
      var item = {
        "isDone": state
      }

      return $.ajax( {
        url:HOSPITAL_URL + "/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(item)
      });
    }

    function deleteItem(id){
      return $.ajax( {
        url:HOSPITAL_URL + "/" + id,
        method: "DELETE"
      });
    }

    return {
      getAllItems:getAllItems,
      getItem:getItem,
      addNewItem:addNewItem,
      updateItem:updateItem,
      markItemDone: markItemDone,
      deleteItem:deleteItem
    }

  }

  window.Facade = new Facade();

}();

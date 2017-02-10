(function () {

	function App() {
		
		var BaseUrl = "https://cure.mybluemix.net";
    var $loginkeeping = $("#loginkeeping");
    var $logbtn = $("#login-btn");
     var $usernamesignup = $("#usernamesignup");
     var $emailsignup = $("#emailsignup");
     var $passwordsignup = $("#passwordsignup");
     var $submitbutton = $("#submitbutton");
     var $submitbutton1 = $("#submitbutton1");
		

	$submitbutton.click(savePage1);
	//$submitbutton1.click(savePage1);
		//$refreshBtn.click(onRefreshClick);
    //$saveNewItemButton.click(onSaveNewItemButtonClicked);
    //$saveExistingItemButton.click(onSaveExistingItemButtonClicked);

		function init() {
			Facade.getAllItems().then(populateItemsList);
		}
	
		function savePage1 () {
								
			var obj = {
				"name" : $usernamesignup.val(),
				"email": $emailsignup.val(),
				"password": $passwordsignup.val(),
			};
	alert("dkjshf");	
			var HospitalUrl = "/api/hospitals";
			Facade.addNewObj(HospitalUrl,"POST",obj);
		}
		function onRefreshClick(){
			$itemsList.css("opacity", "0");
			refreshItemsList();
			setTimeout(function(){
				$itemsList.css("opacity", "1");
			}, 250);
		}
		
		function populateItemsList(items) {
			$itemsList.empty();

			var todos = [];

			$.each(items, function (idx, item) {
				if (item.isDone == false) {
					var $tr = $("<tr/>").attr("itemId", item.id);
					var $doneBox = $("<td>").append($("<input>").attr("type", "checkbox")).click(onDoneButtonClicked);
				} else {
					var $tr = $("<tr/>").attr({"itemId": item.id, "class": "done"});
					var $doneBox = $("<td>").append($("<input>").attr({
						"type": "checkbox",
						"checked": "checked"
					})).click(onDoneButtonClicked);
				}

				var $text = $("<td>").text(item.text);
				var $editButton = $("<td>").text("edit").attr("class", "link edit tc").click(onEditButtonClicked);
				var $saveButton = $("<td>").text("save").attr("class", "link save tc").click(onSaveExistingItemButtonClicked);
				var $deleteButton = $("<td>").text("delete").attr("class", "link delete tc").click(onDeleteButtonClicked);

				$tr.append($doneBox).append($text).append($editButton).append($saveButton).append($deleteButton);
				todos.push($tr);
			});

			if (todos.length > 0) {
				$('#refresh').show();
			}

			$.each(todos, function (idx, $tr) {
				$itemsList.append($tr);
			});
		}

		function onEditButtonClicked() {
			$infoBox.children().removeClass('active');
			$infoBox.children("#editButtonClicked").addClass('active');

			$editBtn = $(this);
			var itemId = $editBtn.parent().attr("itemId");

			$editBtn.next().show();
			$editBtn.hide();

			var todo = $editBtn.prev();
			todo.empty();

			Facade.getItem(itemId).then(function (item) {
				var editField = $("<input>").attr({"type": "text", "value": item.text, "class": "edit-field"});
				todo.append(editField);
				editField.focus();

				$idBeingEdited = item.id;
			});

			$(".edit").unbind("click").addClass("disabled");
			$(".delete").unbind("click").addClass("disabled");
		}

		function onDoneButtonClicked() {
			$infoBox.children().removeClass('active');
			$infoBox.children("#doneButtonClicked").addClass('active');
			var itemId = $(this).parent().attr("itemId");
			Facade.getItem(itemId).then(setToggle);
		}

		function setToggle(item) {
			Facade.markItemDone(item.id, !item.isDone).then(refreshItemsList);
		}

		function onDeleteButtonClicked() {
			var itemId = $(this).parent().attr("itemId");

			$infoBox.children().removeClass('active');
			$infoBox.children("#deleteButtonClicked").addClass('active');
			Facade.deleteItem(itemId).then(refreshItemsList).fail(function (err) {
				alert("DELETE FAILED");
			});
			//}
		}

		function onSaveNewItemButtonClicked() {
      var itemText = $itemText.val();

			$infoBox.children().removeClass('active');
			$infoBox.children("#saveNewItemClicked").addClass('active');
			Facade.addNewItem(itemText).then(refreshItemsList);
      $itemText.val("");
			$itemText.focus();
		}

		function onSaveExistingItemButtonClicked() {
      var itemText = $(".edit-field").val();

			$infoBox.children().removeClass('active');
			$infoBox.children("#saveExistingItemClicked").addClass('active');
			Facade.updateItem($idBeingEdited, itemText).then(refreshItemsList);
			$idBeingEdited = "";
		}

		return {
			init: init
		};
	}


	window.App = new App();

}());



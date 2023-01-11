var itemTemplate = `
<div id="todo-item-@Id" class="todo-item">
	<div class="todo-primary">
		<div id="todo-name-@Id" class="todo-name">@Name</div>
		<div id="todo-edit-@Id" class="todo-edit d-none"></div>
	</div>
	<div id="todo-time-@Id" class="todo-time"></div>
	<div class="todo-completed">
		<div class="form-check form-switch">
			<input id="todo-completed-@Id" class="form-check-input" type="checkbox" onchange="completedOnChange(@Id);">
		</div>
	</div>
	<div id="todo-edit-@Id" class="todo-edit-button" onclick="editOnClick(@Id); ">
		<i class="fa-solid fa-pen-to-square"></i>
	</div>
</div>`

var editTemplate = `
<div class="todo-edit-input">
	<input id="todo-name-input-@Id" type="text" placeholder="Name" value="@Name">
</div>
<div class="todo-edit-select todo-mr-n1">
	<select id="todo-routine-select-@Id" name="routineTypes" onchange="routineOnChange(@Id);">
		<option value="weekly">Weekly</option>
		<option value="daily">Daily</option>
		<option value="cooldown">Cooldown</option>
		<option value="once">Once</option>
	</select>
</div>
<div id="todo-weekday-select-container-@Id" class="todo-edit-select d-none">
	<select id="todo-weekday-select-@Id" name="days">
		<option value="1">Monday</option>
		<option value="2">Tuesday</option>
		<option value="3">Wednesday</option>
		<option value="4">Thursday</option>
		<option value="5">Friday</option>
		<option value="6">Saturday</option>
		<option value="0">Sunday</option>
	</select>
</div>
<div id="todo-hour-container-@Id" class="todo-edit-input todo-edit-input-time todo-mr-n1 d-none">
	<input id="todo-hour-input-@Id" type="text" placeholder="Hour" value="0" onfocusout="editHourOnFocusOut(@Id);">
</div>
<div id="todo-minute-container-@Id" class="todo-edit-input todo-edit-input-time d-none">
	<input id="todo-minute-input-@Id" type="text" placeholder="Minute" value="0" onfocusout="editMinuteOnFocusOut(@Id);">
</div>
<div id="todo-minutes-container-@Id" class="todo-edit-input todo-edit-input-time d-none">
	<input id="todo-minutes-input-@Id" type="text" placeholder="Minutes" value="30" onfocusout="editMinutesOnFocusOut(@Id);">
</div>
<div id="todo-save-@Id" class="todo-save-button d-none" onclick="saveOnClick(@Id);">
	<i class="fa-solid fa-floppy-disk"></i>
</div>
<div id="todo-delete-@Id" class="todo-delete-button d-none" onclick="deleteOnClick(@Id);">
	<i class="fa-solid fa-trash fa-sm"></i>
</div>`

let todoItems = null;

if (localStorage["todoItems"] != null) {
	todoItems = JSON.parse(localStorage["todoItems"]);
} else {
	todoItems = [
		{
			"id": 1,
			"name": "Frontlines",
			"completedDate": null,
			"routine": {
				"type": "daily",
				"hour": 16,
				"minute": 0
			}
		},
		{
			"id": 2,
			"name": "Supply & Provisioning",
			"completedDate": null,
			"routine": {
				"type": "daily",
				"hour": 22,
				"minute": 0
			}
		},
		{
			"id": 3,
			"name": "Custom Deliveries",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": 2,
				"hour": 10,
				"minute": 0
			}
		},
		{
			"id": 4,
			"name": "Retainer",
			"completedDate": null,
			"routine": {
				"type": "cooldown",
				"minutes": "60"
			}
		},
		{
			"id": 5,
			"name": "Doman Enclave",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "2",
				"hour": "10",
				"minute": "0"
			}
		},
		{
			"id": 6,
			"name": "Mini Cactpot",
			"completedDate": null,
			"routine": {
				"type": "daily",
				"hour": "16",
				"minute": "0"
			}
		},
		{
			"id": 7,
			"name": "Jumbo Cactpot",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "6",
				"hour": "21",
				"minute": "0"
			}
		},
		{
			"id": 8,
			"name": "Wonderous Tails",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "2",
				"hour": "10",
				"minute": "0"
			}
		},
		{
			"id": 9,
			"name": "Faux Hollows",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "2",
				"hour": "10",
				"minute": "0"
			}
		},
		{
			"id": 10,
			"name": "Fashion Report",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "5",
				"hour": "16",
				"minute": "0"
			}
		},
		{
			"id": 11,
			"name": "Squadron Priority Mission",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "2",
				"hour": "10",
				"minute": "0"
			}
		},
		{
			"id": 12,
			"name": "Island Sanctuary",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "5",
				"hour": "10",
				"minute": "0"
			}
		},
		{
			"id": 13,
			"name": "Levequests",
			"completedDate": null,
			"routine": {
				"type": "weekly",
				"weekday": "5",
				"hour": "16",
				"minute": "0"
			}
		}
	]
}

var todoItemMap;

setupTodoItems();
sortTodoItems();
checkTime();

function setupTodoItems() {
	var now = new Date();
	todoItemMap = new Map();
	var todoContainer = document.getElementById("todoContainer");

	todoItems.forEach(todoItem => {
		todoItemMap.set(todoItem.id, todoItem);
		todoContainer.innerHTML += itemTemplate.replaceAll("@Id", todoItem.id).replaceAll("@Name", todoItem.name);
		document.getElementById(`todo-item-${todoItem.id}`).setAttribute("data-id", todoItem.id);
		setupTime(todoItem, now);

		if (isComplete(todoItem, now)) {
			document.getElementById(`todo-completed-${todoItem.id}`).setAttribute("checked", "checked");
			document.getElementById(`todo-item-${todoItem.id}`).classList.add("todo-item-completed");
		}
	});
}

function sortTodoItems() {
	var todoItemElements = document.getElementById('todoContainer').children;
	todoItemElements = Array.prototype.slice.call(todoItemElements, 0);
	var now = new Date();

	todoItemElements.sort(function(a, b) {
		var aTodoItem = todoItemMap.get(Number(a.getAttribute("data-id")));
		var bTodoItem = todoItemMap.get(Number(b.getAttribute("data-id")));

		if (aTodoItem.routine.type == "once" && bTodoItem.routine.type != "once") {
			return 1;
		} else if (aTodoItem.routine.type != "once" && bTodoItem.routine.type == "once") {
			return -1;
		} else {
			if (isComplete(aTodoItem, now) && !isComplete(bTodoItem, now)) {
				return 1;
			} else if (!isComplete(aTodoItem, now) && isComplete(bTodoItem, now)) {
				return -1;
			} else {
				if (aTodoItem.time.nextResetDate == null && bTodoItem.time.nextResetDate != null) {
					return -1;
				} else if (aTodoItem.time.nextResetDate != null && bTodoItem.time.nextResetDate == null) {
					return 1;
				} else {
					var aSecondsToNextReset = aTodoItem.time.nextResetDate != null ?
						getTimeToDate(aTodoItem.time.nextResetDate, now).totalSeconds :
						Number.MAX_SAFE_INTEGER;
		
					var bSecondsToNextReset = bTodoItem.time.nextResetDate != null ?
						getTimeToDate(bTodoItem.time.nextResetDate, now).totalSeconds :
						Number.MAX_SAFE_INTEGER;
	
					if (aSecondsToNextReset > bSecondsToNextReset) {
						return 1;
					} else if (aSecondsToNextReset < bSecondsToNextReset) {
						return -1;
					} else {
						if (aTodoItem.name > bTodoItem.name) {
							return 1;
						} else if (aTodoItem.name < bTodoItem.name) {
							return -1;
						} else {
							return 1;
						}
					}
				}
			}
		}
	});

	var html = "";

	for(var i = 0, l = todoItemElements.length; i < l; i++) {
		html += todoItemElements[i].outerHTML;
	}

	document.getElementById('todoContainer').innerHTML = html;
}

function checkTime() {
	var nextCheckDelay = 60000;
	var now = new Date();

	todoItems.forEach(todoItem => {
		if (todoItem.time.nextResetDate != null) {
			if (todoItem.time.nextResetDate < now) {
				todoItem.completedDate = null;
				document.getElementById(`todo-completed-${todoItem.id}`).removeAttribute("checked");
				document.getElementById(`todo-item-${todoItem.id}`).classList.remove("todo-item-completed");
				setupTime(todoItem, now);
				sortTodoItems();
			}

			var time = getTimeToDate(todoItem.time.nextResetDate, now);

			if (time.totalSeconds <= 60) {
				nextCheckDelay = 1000;
			} else if (time.seconds > 0 && time.seconds * 1000 < nextCheckDelay) {
				nextCheckDelay = time.seconds * 1000;
			}
		}

		document.getElementById(`todo-time-${todoItem.id}`).innerHTML = getTimeString(todoItem, now);
	});

	setTimeout(() => {
		checkTime();
	}, nextCheckDelay);
}

function newButtonClick() {
	var todoItem = {
		"id": getNextId(),
		"name": "Unnamed",
		"completedDate": null,
		"routine": {
			"type": "cooldown",
			"minutes": 30
		}
	};

	var now = new Date();
	todoItems.push(todoItem);
	todoItemMap.set(todoItem.id, todoItem);
	todoContainer.innerHTML += itemTemplate.replaceAll("@Id", todoItem.id).replaceAll("@Name", todoItem.name);
	document.getElementById(`todo-item-${todoItem.id}`).setAttribute("data-id", todoItem.id);
	setupTime(todoItem, now);

	if (isComplete(todoItem, now)) {
		document.getElementById(`todo-completed-${todoItem.id}`).setAttribute("checked", "checked");
		document.getElementById(`todo-item-${todoItem.id}`).classList.add("todo-item-completed");
	}

	sortTodoItems();
	saveTodoItems();
}

function exportButtonClick() {
	var exportPanel = document.getElementById("export-panel");

	if (exportPanel.classList.contains("d-none")) {
		document.getElementById("import-panel").classList.add("d-none");
		saveTodoItems();
		document.getElementById("export-input").value = btoa(localStorage["todoItems"]);
		exportPanel.classList.remove("d-none");
	} else {
		exportPanel.classList.add("d-none");
	}
}

function importButtonClick() {
	var importPanel = document.getElementById("import-panel");

	if (importPanel.classList.contains("d-none")) {
		document.getElementById("export-panel").classList.add("d-none");
		importPanel.classList.remove("d-none");
	} else {
		importPanel.classList.add("d-none");
	}
}

function importGoClick() {
	var importString = document.getElementById("import-input").value;

	try {
		todoItems = JSON.parse(atob(importString));
		todoItemMap.clear();
		document.getElementById("todoContainer").innerHTML = "";
		setupTodoItems();
		sortTodoItems();
	} catch (error) {
		console.log(error);
		document.getElementById("error-text").innerHTML = "Could not understand the given text";
		document.getElementById("error-panel").classList.remove("d-none");
		document.getElementById("import-panel").classList.add("d-none");
	}

	document.getElementById("import-panel").classList.add("d-none");
}

function errorCloseClick() {
	document.getElementById("error-panel").classList.add("d-none");
}

function saveTodoItems() {
	var todoItemsCopy = JSON.parse(JSON.stringify(todoItems));

	for (let i = 0; i < todoItemsCopy.length; i++) {
		delete todoItemsCopy[i].time;
	}

	localStorage["todoItems"] = JSON.stringify(todoItemsCopy);
}

function getNextId() {
	var maxId = 1;
	
	for (let i = 0; i < todoItems.length; i++) {
		if (todoItems[i].id > maxId) {
			maxId = todoItems[i].id;
		}
	}

	return maxId + 1;
}

function completedOnChange(id) {
	var isComplete = document.getElementById(`todo-completed-${id}`).checked;
	var todoItem = todoItemMap.get(id);
	var now = new Date();

	if (isComplete) {
		todoItem.completedDate = new Date();
		document.getElementById(`todo-completed-${id}`).setAttribute("checked", "checked");
		document.getElementById(`todo-item-${id}`).classList.add("todo-item-completed");
	} else {
		todoItem.completedDate = null;
		document.getElementById(`todo-completed-${id}`).removeAttribute("checked");
		document.getElementById(`todo-item-${id}`).classList.remove("todo-item-completed");
	}
	
	if (todoItem.routine.type == "cooldown") {
		setupTime(todoItem, now);
	}

	document.getElementById(`todo-time-${todoItem.id}`).innerHTML = getTimeString(todoItem, now);
	sortTodoItems();
	saveTodoItems();
}

function isComplete(todoItem, now) {
	if (todoItem.routine.type == "once") {
		return todoItem.completedDate != null;
	} else if (todoItem.routine.type == "cooldown")  {
		return todoItem.time.nextResetDate != null && now < new Date(todoItem.time.nextResetDate);
	} else {
		return todoItem.completedDate != null && 
			new Date(todoItem.completedDate) < new Date(todoItem.time.nextResetDate) && 
			new Date(todoItem.completedDate) > new Date(todoItem.time.previousResetDate);
	}
}

function editOnClick(id) {
	var todoItem = todoItemMap.get(id);
	var nameContainer = document.getElementById(`todo-name-${id}`);
	var editContainer = document.getElementById(`todo-edit-${id}`);

	if (editContainer.classList.contains("d-none")) {
		editContainer.innerHTML = editTemplate.replaceAll("@Name", todoItem.name).replaceAll("@Id", id);
		nameContainer.classList.add("d-none");
		editContainer.classList.remove("d-none");

		document.getElementById(`todo-save-${id}`).classList.remove("d-none");
		document.getElementById(`todo-delete-${id}`).classList.remove("d-none");
		document.getElementById(`todo-routine-select-${id}`).value = todoItem.routine.type;
		
		if (todoItem.routine.type == "weekly") {
			document.getElementById(`todo-weekday-select-${id}`).value = todoItem.routine.weekday;
			document.getElementById(`todo-hour-input-${id}`).value = todoItem.routine.hour;
			document.getElementById(`todo-minute-input-${id}`).value = todoItem.routine.minute;
		} else if (todoItem.routine.type == "daily") {
			document.getElementById(`todo-hour-input-${id}`).value = todoItem.routine.hour;
			document.getElementById(`todo-minute-input-${id}`).value = todoItem.routine.minute;
		} else if (todoItem.routine.type == "cooldown") {
			document.getElementById(`todo-minutes-input-${id}`).value = todoItem.routine.minutes;
		}

		updateEditOptions(todoItem.routine.type, id);
	} else {
		editContainer.classList.add("d-none");
		nameContainer.classList.remove("d-none");
		document.getElementById(`todo-save-${id}`).classList.add("d-none");
		document.getElementById(`todo-delete-${id}`).classList.add("d-none");
		editContainer.innerHTML = "";
	}
}

function updateEditOptions(routineType, id) {
	if (routineType == "weekly") {
		document.getElementById(`todo-weekday-select-container-${id}`).classList.remove("d-none");
		document.getElementById(`todo-hour-container-${id}`).classList.remove("d-none");
		document.getElementById(`todo-minute-container-${id}`).classList.remove("d-none");
		document.getElementById(`todo-minutes-container-${id}`).classList.add("d-none");
	} else if (routineType == "daily") {
		document.getElementById(`todo-weekday-select-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-hour-container-${id}`).classList.remove("d-none");
		document.getElementById(`todo-minute-container-${id}`).classList.remove("d-none");
		document.getElementById(`todo-minutes-container-${id}`).classList.add("d-none");
	} else if (routineType == "cooldown") {
		document.getElementById(`todo-weekday-select-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-hour-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-minute-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-minutes-container-${id}`).classList.remove("d-none");
	} else if (routineType == "once") {
		document.getElementById(`todo-weekday-select-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-hour-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-minute-container-${id}`).classList.add("d-none");
		document.getElementById(`todo-minutes-container-${id}`).classList.add("d-none");
	}
}

function routineOnChange(id) {
	var routineType = document.getElementById(`todo-routine-select-${id}`).value;
	updateEditOptions(routineType, id);
}

function editHourOnFocusOut(id) {
	var value = document.getElementById(`todo-hour-input-${id}`).value;
	value = getNumberFromInput(value);

	if (Number(value) > 23) {
		value = 23;
	}

	document.getElementById(`todo-hour-input-${id}`).value = value;
}

function editMinuteOnFocusOut(id) {
	var value = document.getElementById(`todo-minute-input-${id}`).value;
	value = getNumberFromInput(value);

	if (Number(value) > 59) {
		value = 59;
	}

	document.getElementById(`todo-minute-input-${id}`).value = value;
}

function editMinutesOnFocusOut(id) {
	var value = document.getElementById(`todo-minutes-input-${id}`).value;
	document.getElementById(`todo-minutes-input-${id}`).value = getNumberFromInput(value);
}

function getNumberFromInput(input) {
	if (input.length > 15) {
		input = input.substring(0, 15);
	}

	return input.replace(/\D/g,'');
}

function saveOnClick(id) {
	var todoItem = todoItemMap.get(id);
	var nameContainer = document.getElementById(`todo-name-${id}`);
	var editContainer = document.getElementById(`todo-edit-${id}`);

	todoItem.name = document.getElementById(`todo-name-input-${id}`).value;
	var routineType = document.getElementById(`todo-routine-select-${id}`).value;

	if (routineType == "weekly") {
		todoItem.routine = {
			"type": routineType,
			"weekday": document.getElementById(`todo-weekday-select-${id}`).value,
			"hour": document.getElementById(`todo-hour-input-${id}`).value,
			"minute": document.getElementById(`todo-minute-input-${id}`).value,
		}
	} else if (routineType == "daily") {
		todoItem.routine = {
			"type": routineType,
			"hour": document.getElementById(`todo-hour-input-${id}`).value,
			"minute": document.getElementById(`todo-minute-input-${id}`).value,
		}
	} else if (routineType == "cooldown") {
		todoItem.routine = {
			"type": routineType,
			"minutes": document.getElementById(`todo-minutes-input-${id}`).value,
		}
	} else if (routineType == "once") {
		todoItem.routine = {
			"type": routineType,
		}
	}

	todoItem.completedDate = null;
	document.getElementById(`todo-completed-${id}`).removeAttribute("checked");
	document.getElementById(`todo-item-${id}`).classList.remove("todo-item-completed");
	editContainer.classList.add("d-none");
	nameContainer.classList.remove("d-none");
	document.getElementById(`todo-save-${id}`).classList.add("d-none");
	document.getElementById(`todo-delete-${id}`).classList.add("d-none");
	document.getElementById(`todo-name-${id}`).innerHTML = todoItem.name;
	setupTime(todoItem, new Date());
	sortTodoItems();
	editContainer.innerHTML = "";
	saveTodoItems();
}

function deleteOnClick(id) {
	var todoItem = todoItemMap.get(id);
	if (confirm(`Are you sure you want to delete ${todoItem.name}?`)) {
		var index = todoItems.indexOf(todoItem);

		if (index > -1) {
			todoItems.splice(index, 1);
		}

		todoItemMap.delete(id);
		document.getElementById(`todo-item-${id}`).outerHTML = "";
		saveTodoItems();
	}
}

function setupTime(todoItem, now) {
	todoItem.completedDate = todoItem.completedDate == null ? null : new Date(todoItem.completedDate);
	todoItem.time = {};
	todoItem.time.nextResetDate = getNextReset(todoItem, now);
	todoItem.time.previousResetDate = getPreviousReset(todoItem);
	document.getElementById(`todo-time-${todoItem.id}`).innerHTML = getTimeString(todoItem, now);
}

function getTimeString(todoItem, now) {
	var timeString = "";

	if (todoItem.time.nextResetDate != null) {
		var time = getTimeToDate(todoItem.time.nextResetDate, now);
		
		if (time.days > 0) {
			timeString = `${time.days}d ${time.hours}h ${time.minutes}m`
		}
		else if (time.hours > 0) {
			timeString = `${time.hours}h ${time.minutes}m`
		}
		else if (time.minutes > 0) {
			timeString = `${time.minutes}m`
		}
		else if (time.seconds > 0) {
			timeString = `${time.seconds}s`
		}
	} else if (todoItem.time.nextResetDate == null && todoItem.routine.type == 'cooldown') {
		timeString = "Ready";
	}

	return timeString;
}

function getTimeToDate(date, now) {
	var totalSeconds = Math.floor(Math.abs(date - now) / 1000);
	var delta = Math.abs(date - now) / 1000;
	var days = Math.floor(delta / 86400);
	delta -= days * 86400;
	var hours = Math.floor(delta / 3600) % 24;
	delta -= hours * 3600;
	var minutes = Math.floor(delta / 60) % 60;
	delta -= minutes * 60;
	var seconds = Math.floor(delta % 60);

	return {
		totalSeconds: totalSeconds,
		seconds: seconds,
		minutes: minutes,
		hours: hours,
		days: days
	}
}

function getNextReset(todoItem, now) {
	switch (todoItem.routine.type) {
		case "weekly": return getNextWeeklyReset(todoItem.routine);
		case "daily": return getNextDailyReset(todoItem.routine);
		case "cooldown": return getNextCooldownReset(todoItem, now);
		default: return null;
	}
}

function getNextWeeklyReset(routine) {
	var date = new Date();

	if (date.getDay() != routine.weekday ||
		(date.getDay() == routine.weekday && (date.getHours() > routine.hour || (date.getHours() == routine.hour && date.getMinutes() >= routine.minute)))) {
		date.setDate(date.getDate() + 1);

		while (date.getDay() != routine.weekday) {
			date.setDate(date.getDate() + 1);
		}
	}
	
	date.setHours(routine.hour);
	date.setMinutes(routine.minute);
	date.setSeconds(0);
	return date;
}

function getNextDailyReset(routine) {
	var date = new Date();

	if (date.getHours() > routine.hour || (date.getHours() == routine.hour && date.getMinutes() >= routine.minute)) {
		date.setDate(date.getDate() + 1);
	}

	date.setHours(routine.hour);
	date.setMinutes(routine.minute);
	date.setSeconds(0);
	return date;
}

function getNextCooldownReset(todoItem, now) {
	var date = null;

	if (todoItem.completedDate != null && 
		((now - todoItem.completedDate) / 1000) < todoItem.routine.minutes * 60) {
		date = new Date(todoItem.completedDate.getTime() + todoItem.routine.minutes*60000);
	}

	return date;
}

function getPreviousReset(todoItem) {
	switch (todoItem.routine.type) {
		case "weekly": return getPreviousWeeklyReset(todoItem.routine);
		case "daily": return getPreviousDailyReset(todoItem.routine);
		default: return null;
	}
}

function getPreviousWeeklyReset(routine) {
	var date = new Date();

	if (date.getDay() != routine.weekday ||
		(date.getDay() == routine.weekday && (date.getHours() < routine.hour || (date.getHours() == routine.hour && date.getMinutes() < routine.minute)))) {
		date.setDate(date.getDate() - 1);

		while (date.getDay() != routine.weekday) {
			date.setDate(date.getDate() - 1);
		}
	}
	
	date.setHours(routine.hour);
	date.setMinutes(routine.minute);
	date.setSeconds(0);
	return date;
}

function getPreviousDailyReset(routine) {
	var date = new Date();

	if (date.getHours() < routine.hour || (date.getHours() == routine.hour && date.getMinutes() < routine.minute)) {
		date.setDate(date.getDate() - 1);
	}

	date.setHours(routine.hour);
	date.setMinutes(routine.minute);
	date.setSeconds(0);
	return date;
}
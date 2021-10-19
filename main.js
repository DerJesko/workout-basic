// for debug purposes
const t = today()
var exercises = {
    "2021-10-19": [
        { exerciseType: exerciseTypes[0], repetitionType: "2-4", reps: "", weight: "2" },
        { exerciseType: exerciseTypes[0], repetitionType: "2-4", reps: "3", weight: "" }
    ]
}

function updateExercises() {
    var exerciseList = document.querySelectorAll("#exercise-list > li");
    exercises[t] = [];
    for (const element of exerciseList) {
        exercises[t].push({
            exerciseType: element.childNodes[3].value,
            repetitionType: element.childNodes[4].value,
            reps: element.childNodes[6].value,
            weight: element.childNodes[8].value
        });
    }
}

var exerciseList = document.getElementById("exercise-list");

function setExercises(exercises) {
    exerciseList.innerHTML = ''
    exercises.forEach(element => {
        var li = document.createElement("li");
        var upButton = document.createElement("button");
        upButton.textContent = "▲"
        upButton.id = "up";
        li.appendChild(upButton);
        var downButton = document.createElement("button");
        downButton.textContent = "▼"
        downButton.id = "down";
        li.appendChild(downButton);
        li.appendChild(document.createTextNode("Exercise "));
        var exType = document.createElement("select");
        exType.onchange = updateExercises;
        exerciseTypes.forEach(exercise => {
            exType.add(new Option(exercise.name, exercise.name));
        });
        li.appendChild(exType);
        var repType = document.createElement("select");
        repetitionTypes.forEach(repetitionType => {
            repType.add(new Option(repetitionType, repetitionType));
        });
        repType.onchange = updateExercises;
        li.appendChild(repType);
        li.appendChild(document.createTextNode("Reps done: "));
        var reps = document.createElement("input");
        reps.setAttribute("type", "number");
        reps.value = element.reps;
        reps.onchange = updateExercises;
        li.appendChild(reps);
        li.appendChild(document.createTextNode("Weight done: "));
        var weight = document.createElement("input");
        weight.setAttribute("type", "number");
        weight.value = element.weight;
        weight.onchange = updateExercises;
        li.appendChild(weight);
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.id = "delete-button";
        li.appendChild(deleteButton);
        exerciseList.appendChild(li);
    });
}

function exercisesEdited(exercises) {
    for (const element of exercises) {
        if (element.reps != "" && element.reps != null) {
            return true;
        }
        if (element.weight != "" && element.weight != null) {
            return true;
        }
    };
    return false;
}

function today() {
    d = new Date;
    return d.toISOString().split('T')[0];
}

var addExerciseButton = document.getElementById("add-exercise");
addExerciseButton.onclick = () => {
    exercises.push({ exerciseType: "", repetitionType: "", reps: "", weight: "" });
    setExercises(exercises);
}

function f() {
    if (!exercisesEdited(exercises[t])) {
        console.log("fish");
        exercises[t] = [
            { exerciseType: exerciseTypes[0], repetitionType: "2-4", reps: "", weight: "2" },
            { exerciseType: exerciseTypes[0], repetitionType: "2-4", reps: "3", weight: "" }
        ];
        setExercises(exercises[t]);
    }
}

var muscleGroupSelector = document.getElementById("workout-muscle");
muscleGroupSelector.onchange = f;
var workoutTypeSelector = document.getElementById("workout-type");
workoutTypeSelector.onchange = f;

setExercises(exercises[t]);
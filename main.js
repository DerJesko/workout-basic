// for debug purposes
const t = today();
var exercises = {};
const exercisesString = localStorage.getItem("exercises");
if (exercisesString != null) {
    exercises = JSON.parse(exercisesString);
}
if (exercises[t] != null) {
    exercises[t] = [];
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
    localStorage.setItem("exercises", JSON.stringify(exercises));
}

function swap_right(i) {
    if (0 <= i && i < exercises[t].length && 0 <= i + 1 && i + 1 < exercises[t].length) {
        [exercises[t][i], exercises[t][i + 1]] = [exercises[t][i + 1], exercises[t][i]]
    }
}

var exerciseList = document.getElementById("exercise-list");

function setExercises() {
    exerciseList.innerHTML = ''
    for (let i = 0; i < exercises[t].length; i++) {
        var li = document.createElement("li");
        // Up Button
        var upButton = document.createElement("button");
        upButton.textContent = "▲"
        upButton.id = "up";
        upButton.onclick = () => {
            swap_right(i - 1);
            setExercises(exercises[t]);
            localStorage.setItem("exercises", JSON.stringify(exercises));
        };
        li.appendChild(upButton);
        // Down Button
        var downButton = document.createElement("button");
        downButton.textContent = "▼"
        downButton.id = "down";
        downButton.onclick = () => {
            swap_right(i);
            setExercises(exercises[t]);
            localStorage.setItem("exercises", JSON.stringify(exercises));
        };
        li.appendChild(downButton);
        li.appendChild(document.createTextNode("Exercise "));
        // Select Exercise Type
        var exType = document.createElement("select");
        exType.onchange = updateExercises;
        exerciseTypes.forEach(exercise => {
            exType.add(new Option(exercise.name, exercise.name));
        });
        exType.value = exercises[t][i].exerciseType
        li.appendChild(exType);
        // Select Repetition Type
        var repType = document.createElement("select");
        repetitionTypes.forEach(repetitionType => {
            repType.add(new Option(repetitionType, repetitionType));
        });
        repType.onchange = updateExercises;
        repType.value = exercises[t][i].repetitionType
        li.appendChild(repType);
        li.appendChild(document.createTextNode("Reps done: "));
        var reps = document.createElement("input");
        reps.setAttribute("type", "number");
        reps.value = exercises[t][i].reps;
        reps.onchange = updateExercises;
        li.appendChild(reps);
        li.appendChild(document.createTextNode("Weight done: "));
        var weight = document.createElement("input");
        weight.setAttribute("type", "number");
        weight.value = exercises[t][i].weight;
        weight.onchange = updateExercises;
        li.appendChild(weight);
        // Delete Button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete"
        deleteButton.id = "delete-button";
        deleteButton.onclick = () => {
            exercises[t].splice(i, 1);
            setExercises(exercises[t]);
            localStorage.setItem("exercises", JSON.stringify(exercises));
        }
        li.appendChild(deleteButton);
        exerciseList.appendChild(li);
    }
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
    exercises[t].push({ exerciseType: exerciseTypes[0].name, repetitionType: repetitionTypes[0], reps: "", weight: "" });
    setExercises(exercises);
}

var muscleGroupSelector = document.getElementById("workout-muscle");
muscleGroupSelector.onchange = loadPredefinedWorkouts;
var workoutTypeSelector = document.getElementById("workout-type");
workoutTypeSelector.onchange = loadPredefinedWorkouts;

function loadPredefinedWorkouts() {
    if (!exercisesEdited(exercises[t])) {
        switch ((muscleGroupSelector.value, workoutTypeSelector.value)) {
            case ("leg", "strength"):
                exercises[t] = [
                    { exerciseType: "Squat", repetitionType: "2-4", reps: "", weight: "" },
                    { exerciseType: "Leg Press", repetitionType: "2-4", reps: "", weight: "" },
                    { exerciseType: "Deadlift", repetitionType: "2-4", reps: "", weight: "" }
                ];
                break;
            case ("back-biceps", "strength-endurance"):
                exercises[t] = [
                    { exerciseType: "One Arm Dumbbell Row", repetitionType: "3-5", reps: "", weight: "" },
                    { exerciseType: "Lat Pulldown Wide", repetitionType: "2-4", reps: "", weight: "" },
                    { exerciseType: "Lat Pulldown Narrow", repetitionType: "2-4", reps: "", weight: "" },
                    { exerciseType: "Cable Row w/ Wide Neutral Grip", repetitionType: "2-4", reps: "", weight: "" },
                    { exerciseType: "Rear Deltoid Machine", repetitionType: "2-4", reps: "", weight: "" },
                    { exerciseType: "Biceps Curl", repetitionType: "pyramid", reps: "", weight: "" }
                ];
                break;
            default:
                exercises[t] = [];
                break;
        }
        setExercises(exercises[t]);
    }
}

setExercises(exercises[t]);

var body = document.querySelector("body");
var pre = document.createElement("pre");
const jsn = JSON.parse(localStorage.getItem("exercises"));
var s = "";
for (let [date, value] of Object.entries(jsn)) {
    s += date + "\n";
    for (let exercise of value) {
        s += "  " + exercise.exerciseType + ": " + exercise.weight + "kg x " + exercise.reps + " of " + exercise.repetitionType + "\n";
    }
}
pre.textContent = s;
body.appendChild(pre);
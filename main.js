exercises = [
    { exerciseType: exerciseTypes[0], repetitionType: "2-4", reps: "", weight: "2" },
    { exerciseType: exerciseTypes[0], repetitionType: "2-4", reps: "3", weight: "" }
]
var exerciseList = document.getElementById("exercise-list");

function setExercises(exercises) {
    exerciseList.innerHTML = ''
    exercises.forEach(element => {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode("Exercise "));
        var exType = document.createElement("select");
        exerciseTypes.forEach(exercise => {
            exType.add(new Option(exercise.name, exercise.name));
        });
        li.appendChild(exType);
        var repType = document.createElement("select");
        repetitionTypes.forEach(repetitionType => {
            repType.add(new Option(repetitionType, repetitionType));
        });
        li.appendChild(repType);
        li.appendChild(document.createTextNode("Reps done: "));
        var reps = document.createElement("input");
        reps.setAttribute("type", "number");
        reps.value = element.reps;
        li.appendChild(reps);
        li.appendChild(document.createTextNode("Weight done: "));
        var weight = document.createElement("input");
        weight.setAttribute("type", "number");
        weight.value = element.weight;
        li.appendChild(weight);
        exerciseList.appendChild(li);
    });
}

function exercisesEdited() {
    document.querySelectorAll("#exercise-list > li > input").forEach(element => {
        if (element.value != "" && element.value != null) {
            console.log("b");
        }
    });
    return false;
}

var addExerciseButton = document.getElementById("add-exercise");
addExerciseButton.onclick = () => {
    exercises.push({ exerciseType: "", repetitionType: "", reps: "", weight: "" });
    setExercises(exercises);
}

setExercises(exercises);
console.log(exercisesEdited());

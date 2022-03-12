import data from "./tagouts.js";

export async function renderabc2() {
    var valves = await data;
    let abc2 = valves[1];
    console.log("abc2 status " + abc2.status);
    let abc2status = abc2.status;
    var abc2color = document.getElementById("abc2statusresult");
    if (abc2status == "Danger_Tag_open") {
        abc2color.style.color = "green";
        return;
      } else if (abc2status == "Untagged") {
        abc2color.style.color = "black";
        return;
    } else if (abc2status == "Danger_Tag_shut") {
        abc2color.style.color = 'red';
        return;
    } else if (abc2status == "Caution_Tag") {
        abc2color.style.color = 'yellow';
    } else {
      abc2color.style.color = "silver";
    }
}
export async function renderabc3() {
    var valves = await data;
    let abc3 = valves[2];
    console.log("abc3 status " + abc3.status);
    let abc3status = abc3.status;
    var abc3color = document.getElementById("abc3statusresult");
    if (abc3status == "Danger_Tag_open") {
        abc3color.style.color = "green";
        return;
      } else if (abc3status == "Untagged") {
        abc3color.style.color = "black";
        return;
    } else if (abc3status == "Danger_Tag_shut") {
        abc3color.style.color = 'red';
        return;
    } else if (abc3status == "Caution_Tag") {
        abc3color.style.color = 'yellow';
    } else {
      abc3color.style.color = "silver";
    }
}


export async function rendervalves() {
    var rendervalves = await data;
    const abc1 = rendervalves[0];
    console.log("abc1 status " + abc1.status);
    let abc1status = abc1.status;
    var abc1color = document.getElementById("abc1statusresult");
    if (abc1status == "Danger_Tag_open") {
        abc1color.style.color = "green";
      } else if (abc1status == "Untagged") {
        abc1color.style.color = "black";
    } else if (abc1status == "Danger_Tag_shut") {
        abc1color.style.color = 'red';
    } else if (abc1status == "Caution_Tag") {
        abc1color = 'yellow';
    } else {
      abc1color.style.color = "silver";
    }
}

export async function statuscheck() {
let x = document.getElementById("tagstatus");
if (abc1status == "Danger_Tag_open") {
    document.getElementById("statusresult").style.color = "green";
    console.log(abc1status);
    console.log("danger open");
    return;
  } else if (abc1status == "Untagged") {
    document.getElementById("statusresult").style.color = "black";
    console.log(abc1status);
    console.log("untagged");
    return;
} else if (abc1status == "Danger_Tag_shut") {
    document.getElementById("statusresult").style.color = 'red';
    console.log(abc1status);
    console.log("danger shut");
    return;
} else if (abc1status == "Caution_Tag") {
    document.getElementById("statusresult").style.color = 'yellow';
    console.log(abc1status);
    console.log("caution");
    return;
} else {
  document.getElemenyById("statusresult").style.color = "silver";
  console.log(x);
  return;
}
}

rendervalves();
renderabc2();
renderabc3();
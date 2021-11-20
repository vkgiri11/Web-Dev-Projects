//Default properties of any input-cell
let defaultProperties = {
    text: "",
    "font-weight": "",
    "font-style": "",
    "text-decoration": "",
    "text-align": "left",
    "background-color": "#ffffff",
    color: "#000000",
    "font-family": "Times New Roman",
    "font-size": "14px",
};

//Any cell that changes will get stored in sheet1 array, Initially nothing is there in sheet so its blank
let cellData = {
    Sheet1: {},
};

//Default values
let selectedSheet = "Sheet1";
let totalSheets = 1;

$(document).ready(function () {
    for (let i = 1; i <= 100; i++) {
        let ans = "";

        let n = i;

        while (n > 0) {
            let rem = n % 26;
            if (rem == 0) {
                ans = "Z" + ans;
                n = Math.floor(n / 26) - 1;
            } else {
                ans = String.fromCharCode(rem - 1 + 65) + ans;
                n = Math.floor(n / 26);
            }
        }

        let column = $(`<div class="col-name colId-${i}" id="colCod-${ans}">${ans}</div>`);
        $(".col-name-container").append(column);

        let row = $(`<div class="row-name" id="rowId-${i}">${i}</div>`);
        $(".row-name-container").append(row);
    }

    for (let i = 1; i <= 100; i++) {
        let row = $(`<div class="cell-row"></div>`);
        for (let j = 1; j <= 100; j++) {
            //$(`.colId-${j}`) -> gets the colums id
            //attr(`.colCod`) -> finds the value off the attribute .colCod
            // .split("-")[1] -> splits the array acc. to '-' and at the first index the column code is there
            let colCode = $(`.colId-${j}`).attr("id").split("-")[1];
            let column = $(`<div class="input-cell" contenteditable="false" id = "row-${i}-col-${j}" data="code-${colCode}"></div>`);
            row.append(column);
        }
        $(".input-cell-container").append(row);
    }

    $(".align-icons").click(function () {
        //Remove the class already selected
        $(".align-icons.selected").removeClass("selected");
        //Apply the class to where it is selected
        $(this).addClass("selected");
    });

    $(".style-icons").click(function () {
        $(this).toggleClass("selected");
    });

    $(".input-cell").click(function (myEvent) {
        if (myEvent.ctrlKey) {
            $(this).addClass("selected");

            let [rowId, colId] = getRowColID(this);
            if (rowId > 1) {
                let isTopCellSelected = $(`#row-${rowId - 1}-col-${colId}`).hasClass("selected");
                if (isTopCellSelected) {
                    $(this).addClass("top-cell-selected");
                    $(`#row-${rowId - 1}-col-${colId}`).addClass("bottom-cell-selected");
                }
            }
            if (rowId < 100) {
                let isBottomCellSelected = $(`#row-${rowId + 1}-col-${colId}`).hasClass("selected");
                if (isBottomCellSelected) {
                    $(this).addClass("bottom-cell-selected");
                    $(`#row-${rowId + 1}-col-${colId}`).addClass("top-cell-selected");
                }
            }
            if (colId > 1) {
                let isLeftCellSelected = $(`#row-${rowId}-col-${colId - 1}`).hasClass("selected");
                if (isLeftCellSelected) {
                    $(this).addClass("left-cell-selected");
                    $(`#row-${rowId}-col-${colId - 1}`).addClass("right-cell-selected");
                }
            }
            if (colId < 100) {
                let isRightCellSelected = $(`#row-${rowId}-col-${colId + 1}`).hasClass("selected");
                if (isRightCellSelected) {
                    $(this).addClass("right-cell-selected");
                    $(`#row-${rowId}-col-${colId + 1}`).addClass("left-cell-selected");
                }
            }
        } else {
            $(".input-cell.selected").removeClass("top-cell-selected");
            $(".input-cell.selected").removeClass("bottom-cell-selected");
            $(".input-cell.selected").removeClass("left-cell-selected");
            $(".input-cell.selected").removeClass("right-cell-selected");
            $(".input-cell.selected").removeClass("selected");
            $(this).addClass("selected");
        }
        changeHeader(this);
    });

    function changeHeader(elem) {
        let [rowId, colId] = getRowColID(elem);
        let cellInfo = defaultProperties;
        //if the row and col both exists, then change the cellinfo
        if (cellData[selectedSheet][rowId] && cellData[selectedSheet][rowId][colId]) cellInfo = cellData[selectedSheet][rowId][colId];

        cellInfo["font-weight"] ? $(".bold-icon").addClass("selected") : $(".bold-icon").removeClass("selected");
        cellInfo["font-style"] ? $(".italic-icon").addClass("selected") : $(".italic-icon").removeClass("selected");
        cellInfo["text-decoration"] ? $(".underline-icon").addClass("selected") : $(".underline-icon").removeClass("selected");

        let alignment = cellInfo["text-align"];
        $(".align-icons.selected").removeClass("selected");
        $(".align-" + alignment + "-icon").addClass("selected");

        $(".background-color-picker").val(cellInfo["background-color"]);
        $(".text-color-picker").val(cellInfo["color"]);

        $(".font-family-selector").css("font-family", cellInfo["font-family"]);

        $(".font-family-selector").val(cellInfo["font-family"]);
        $(".font-size-selector").val(cellInfo["font-size"]);
    }

    $(".input-cell").dblclick(function () {
        $(".input-cell.selected").removeClass("selected");
        $(this).addClass("selected");
        $(this).attr("contenteditable", "true");
        $(this).focus();
    });

    //As soon as other cell is selected, we cant select and edit it, we need to double click to edit again
    $(".input-cell").blur(function () {
        $(".input-cell.selected").attr("contenteditable", "false");
        updateCell("text", $(this).text());
    });

    $(".input-cell-container").scroll(function () {
        // console.log(this.scrollLeft);
        $(".col-name-container").scrollLeft(this.scrollLeft);
        $(".row-name-container").scrollTop(this.scrollTop);
    });
});

//function that returns row and col id
function getRowColID(elem) {
    let idArr = $(elem).attr("id").split("-");
    let rowId = parseInt(idArr[1]);
    let colId = parseInt(idArr[3]);
    return [rowId, colId];
}

function updateCell(property, value, defaultPossible) {
    $(".input-cell.selected").each(function () {
        $(this).css(property, value);
        let [rowId, colId] = getRowColID(this);

        // if this particular exists in celldata obj, ie if it is modified earlier
        // then it must be stored in cell data object
        if (cellData[selectedSheet][rowId]) {
            // Similarly if this particular column exits
            if (cellData[selectedSheet][rowId][colId]) {
                // if it exists, update its value
                cellData[selectedSheet][rowId][colId][property] = value;
            } else {
                //if it doesnt exists, make a new cell and assign default properties to it and then update the value
                cellData[selectedSheet][rowId][colId] = { ...defaultProperties };
                cellData[selectedSheet][rowId][colId][property] = value;
            }
        }
        // if the row doesnt exists
        else {
            // create a row
            cellData[selectedSheet][rowId] = {};
            // create a col, assign default properties to it and then update its value
            cellData[selectedSheet][rowId][colId] = { ...defaultProperties };
            cellData[selectedSheet][rowId][colId][property] = value;
        }

        //We need to check if after modification did the cell restored to its default value
        // if both are same, that means no net change happened in cell so delete the column from the celldata obj
        if (defaultPossible && JSON.stringify(cellData[selectedSheet][rowId][colId]) === JSON.stringify(defaultProperties)) {
            delete cellData[selectedSheet][rowId][colId];
            //if after deleting column, the row becomes empty we will delete the row too
            //since it is a object we used object.keys
            if (Object.keys(cellData[selectedSheet][rowId]).length == 0) delete cellData[selectedSheet][rowId];
        }
    });
}

$(".bold-icon").click(function () {
    if ($(this).hasClass("selected")) {
        updateCell("font-weight", "", true); //if the cell is selected remove the prop
    } else {
        updateCell("font-weight", "bold", false);
    }
});

$(".italic-icon").click(function () {
    if ($(this).hasClass("selected")) {
        updateCell("font-style", "", true); //if the cell is selected remove the prop
    } else {
        updateCell("font-style", "italic", false);
    }
});

$(".underline-icon").click(function () {
    if ($(this).hasClass("selected")) {
        updateCell("text-decoration", "", true); //if the cell is selected remove the prop
    } else {
        updateCell("text-decoration", "underline", false);
    }
});

$(".align-left-icon").click(function () {
    if (!$(this).hasClass("selected")) {
        updateCell("text-align", "left", true);
    }
});

$(".align-right-icon").click(function () {
    if (!$(this).hasClass("selected")) {
        updateCell("text-align", "right", false);
    }
});

$(".align-center-icon").click(function () {
    if (!$(this).hasClass("selected")) {
        updateCell("text-align", "center", true);
    }
});

$(".color-fill-icon").click(function () {
    $(".background-color-picker").click();
});

$(".color-text-icon").click(function () {
    $(".text-color-picker").click();
});

$(".background-color-picker").change(function () {
    updateCell("background-color", $(this).val(), true);
});

$(".text-color-picker").change(function () {
    updateCell("color", $(this).val(), true);
});

$(".font-family-selector").change(function () {
    // for changing in cell
    updateCell("font-family", $(this).val(), true);
    //for changing in the selector in the bar
    $(".font-family-selector").css("font-family", $(this).val());
});

$(".font-size-selector").change(function () {
    updateCell("font-size", $(this).val(), true);
});

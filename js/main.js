var data = {
    "cells": [
        { id: 0, "step": "2", "label": "Metadata Aggregator" },
        { id: 2, "step": "3", "label": "Build Plan Generation" },
        { id: 4, "label": "Service Catalog", "size": { height: 3, width: 2 } },
        { id: 6, "label": "Policy-as-Code", "size": { height: 2, width: 3 } },
        { id: 8, "step": "8", "label": "Acceptance Process", "size": { height: 2, width: 1 } },
        { id: 37, "step": "1", "label": "Process initialization" },
        { id: 39, "step": "4", "label": "Full Stack Build", "size": { height: 1, width: 4 } },
        { id: 41, "step": "5", "label": "Testing Plan Generation" },
        { id: 43, "step": "6", "label": "Automated Testing" },
        { id: 45, "step": "7", "label": "Build Release" },

        { id: 46, "template": "/template_01.html", "size": { height: 2, width: 3 } },
        { id: 47, "template": "/template_02.html", "size": { height: 2, width: 3 } },
        { id: 48, "template": "/template_03.html", "size": { height: 2, width: 3 } },
        { id: 49, "template": "/template_04.html", "size": { height: 2, width: 3 } }
    ]
};

var lines = {
    "cells": [
        { id: 9, "arrow": "up" },
        { id: 15, "line": "vertical", "artifact": "A" },
        { id: 25, "line": "vertical" },

        { id: 1, "arrow": "right" },

        { id: 11, "line": "vertical" },
        { id: 17, "line": "vertical", "artifact": "B" },
        { id: 27, "arrow": "down" },

        { id: 3, "line": "horizontal", "dashed": true },
        { id: 5, "line": "horizontal", "dashed": true },

        { id: 40, "arrow": "right" },
        { id: 42, "arrow": "right" },
        { id: 44, "arrow": "right" },

        { id: 20, "line": "vertical", "dashed": true },
        { id: 32, "line": "vertical", "dashed": true, "artifact": "C" },

        { id: 22, "line": "vertical", "dashed": true },
        { id: 34, "line": "vertical", "dashed": true, "artifact": "D" },

        { id: 36, "line": "vertical", "artifact": "E" },
        { id: 24, "arrow": "up" }
    ]
};

window.onload = function () {
    const workflow = document.getElementById('workflow');
    const rows = 7;
    const cols = 12;
    let cells_needed = (rows * cols);

    for (var i = 0; i < cells_needed; i++) {
        const cell = document.createElement("div");
        const cell_data = data.cells.find(n => n.id === i);
        const cell_line = lines.cells.find(n => n.id === i);


        if (cell_data) {

            cell.classList.add("workflow__cell");
            cell.setAttribute("data-clickable", "true");

            if ("size" in cell_data) {
                const h_span = cell_data.size.width;
                const v_span = cell_data.size.height;

                if (h_span === 2) {
                    cell.classList.add("workflow__cell-horizontal-span-2");
                    cells_needed = cells_needed - 1;
                } else if (h_span == 3) {
                    cell.classList.add("workflow__cell-horizontal-span-3");
                    cells_needed = cells_needed - 2;
                } else if (h_span == 4) {
                    cell.classList.add("workflow__cell-horizontal-span-4");
                    cells_needed = cells_needed - 3;
                }
                if (v_span == 2) {
                    cell.classList.add("workflow__cell-vertical-span-2");
                    cells_needed = cells_needed - 1;
                } else if (v_span == 3) {
                    cell.classList.add("workflow__cell-vertical-span-3");
                    cells_needed = cells_needed - 2;
                }

                if (h_span == 2 && v_span == 2) {
                    cells_needed = cells_needed - 1;
                } else if ((h_span == 2 && v_span == 3) || (h_span == 3 && v_span == 2)) {
                    cells_needed = cells_needed - 2;
                }
            }

            if ("label" in cell_data) {
                const label_container = document.createElement("div");
                label_container.classList.add("step-label");
                label_container.innerHTML = `<h2>${cell_data.label}</h2>`;
                cell.appendChild(label_container);
            }

            if ("step" in cell_data) {
                const step_container = document.createElement("div");
                step_container.classList.add("step-number");
                step_container.innerHTML = cell_data.step;
                cell.appendChild(step_container);
            }

            if ("template" in cell_data) {
                cell.classList.remove("workflow__cell");
                cell.classList.add("workflow__cell-explainer");
                const content = cell_data.template;
                fetch(content)
                    .then(r => r.text())
                    .then(t => cell.innerHTML = t);
                cell.setAttribute("data-clickable", "false");
            }

        } else if (cell_line) {
            cell.classList.add("workflow__cell-empty");
            const arrow_container = document.createElement("div");
            const arrow_line = document.createElement("div");
            arrow_container.classList.add("arrow-container");

            if ("arrow" in cell_line) {
                const arrow_pointer = document.createElement("div");

                arrow_container.classList.add("arrow-container-" + cell_line.arrow);
                arrow_pointer.classList.add("arrow-pointer", cell_line.arrow);
                arrow_line.classList.add("line-" + cell_line.arrow);

                arrow_pointer.innerHTML = `
                <ul>
                  <li><span class="arrow arrow-${cell_line.arrow}"></span></li>
                </ul>
                `
                arrow_container.appendChild(arrow_pointer);

            } else if ("line" in cell_line) {
                arrow_line.classList.add("line-" + cell_line.line);

                if ("dashed" in cell_line) {
                    arrow_line.classList.add("line-" + cell_line.line + "-dashed");
                }
            }

            if ("artifact" in cell_line) {
                const artifact_container = document.createElement("div");
                const artifact = document.createElement("div");
                const artifact_label = document.createElement("div");

                artifact_container.classList.add("step-artifact-container");
                artifact.classList.add("step-artifact");
                artifact_label.classList.add("step-artifact-label");

                artifact_label.innerHTML = `${cell_line.artifact}`;

                artifact.appendChild(artifact_label);
                artifact_container.appendChild(artifact);

                arrow_container.appendChild(artifact_container);
                arrow_container.classList.add("arrow-container-up");
            }

            arrow_container.appendChild(arrow_line);
            cell.appendChild(arrow_container);
        }
        // else {
        //     cell.innerHTML = `<p>${i.toString()}</p>`;
        // }
        workflow.appendChild(cell);
    }

    /***** ***** ***** ***** ***** ***** ***** ***** *****  
      Load event listeners for all the "clickable" entities
    ***** ***** ***** ***** ***** ***** ***** ***** *****/

    const interactiveCells = document.querySelectorAll(".workflow__cell");

    interactiveCells.forEach(interactiveCell => {

        const clickable = interactiveCell.getAttribute("data-clickable");

        if (clickable === "true") {
            interactiveCell.addEventListener('click', () => {
                alert("Click");
            })
        }

    })
}
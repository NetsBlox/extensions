const STARTER_HTML = `
    <table>
        <tr>
            <td><table style="height: 400; width: 100; display: inline-block;">
                <tr style="height: 80px;"><td><h3>crash</h3></td></tr>
                <tr style="height: 80px;"><td><h3>hat</h3></td></tr>
                <tr style="height: 80px;"><td><h3>snare</h3></td></tr>
                <tr style="height: 80px;"><td><h3>tom</h3></td></tr>
                <tr style="height: 80px;"><td><h3>kick</h3></td></tr>
            </table></td>
            <td><table id="beat-grid" style="height: 400px; width: 400px; border-style: solid;">
            </table></td>
        </tr>
    </table>

    <table>
        <tr><td><label for="bars">Count</label></td>
        <td><input type="number" name="bars" value="8" id="bars"/><td>
        </tr>
        <tr>
            <td><label for="divs">Division</label></td>
            <td><select id="divs" name="divs">
                <option value="Quarter">Quarter</option>
                <option value="Eighth" selected="selected">Eighth</option>
                <option value="Sixteenth">Sixteenth</option>
            </select></td>
        </tr>
    </table>
`;

function createSlot() {
    let slot = document.createElement('td');
    slot.previousColor = 'white';
    slot.style.backgroundColor = 'white';
    slot.style.borderStyle = 'solid';

    slot.addEventListener('mouseover', () => {
        if (slot.style.backgroundColor === 'black') slot.style.backgroundColor = 'grey';
        else slot.style.backgroundColor = 'black';
    });

    slot.addEventListener('mouseout', () => {
        slot.style.backgroundColor = slot.previousColor;
    });

    slot.addEventListener('click', () => {
        slot.previousColor = slot.previousColor === 'white' ? 'black' : 'white';
    });

    return slot
}

function creatRow(id, beatDivision) {
    let row = document.createElement('tr');
    row.id = id;
    for (let i = 0; i < beatDivision; i++) row.appendChild(createSlot());
    return row;
}

class BeatGrid {
    static #instance = null;

    constructor(contentElement) {
        if (BeatGrid.#instance) 
            return BeatGrid.#instance;
        BeatGrid.#instance = this;

        contentElement.innerHTML = STARTER_HTML;
        document.getElementById('bars').addEventListener('change', () => {
            BeatGrid.#clear();
            BeatGrid.#loadGrid(document.getElementById('bars').value);
        });
        
        BeatGrid.#loadGrid(8);
    }

    static getGridInfo() {
        if (BeatGrid.#instance) {
            const rawGrid = document.getElementById('beat-grid');
            const drums = Array.from(rawGrid.children);
            const grid = drums.map(drum => {
                return Array.from(drum.children).map(x => x.previousColor === 'white' ? 0 : 1);
            });

            let track = grid[0].map(_ => []);
            for (let i = 0; i < grid[0].length; i++) 
                for (let j = 0; j < drums.length; j++) 
                    if (grid[j][i] === 1) track[i].push(drums[j].id);

            return track;
        }
        return undefined;
    }

    static getBeatDivision() {
        if (BeatGrid.#instance)
            return document.getElementById('divs').value;
        return undefined;
    }

    static #clear() {
        let gridTable = document.getElementById('beat-grid');
        while (gridTable.firstChild) gridTable.removeChild(gridTable.firstChild);
    }

    static #loadGrid(beatDivision) {
        let beatGrid = document.getElementById('beat-grid');
        beatGrid.appendChild(creatRow('crash', beatDivision));
        beatGrid.appendChild(creatRow('closed hi-hat', beatDivision));
        beatGrid.appendChild(creatRow('snare', beatDivision));
        beatGrid.appendChild(creatRow('floor tom', beatDivision));
        beatGrid.appendChild(creatRow('kick', beatDivision));
    }
}

window.BeatGrid = BeatGrid;
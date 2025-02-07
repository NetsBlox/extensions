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
            <td><label for="name">name</label></td>
            <td><input type="text" id="name" name="name" placeholder="name..."/></td>
        </tr>
        <tr><button id="save">save</button></tr>
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

    #block;

    constructor(contentElement) {
        if (BeatGrid.#instance) 
            return BeatGrid.#instance;
        BeatGrid.#instance = this;

        contentElement.innerHTML = STARTER_HTML;
        this.customBeats = {}
        this.#block = null;
        
        document.getElementById('bars').addEventListener('change', () => {
            this.#clear();
            this.#loadGrid(document.getElementById('bars').value);
        });

        document.getElementById('save').addEventListener('click', () => {
            const name = document.getElementById('name').value;
            this.customBeats[name] = this.getGridInfo();
            if (this.#block !== null) this.#block.choices[name] = name;
        });
        
        this.#loadGrid(8);
    }

    getGridInfo() {
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

    setBlock(block) {
        this.#block = block;
    }

    #clear() {
        let gridTable = document.getElementById('beat-grid');
        while (gridTable.firstChild) gridTable.removeChild(gridTable.firstChild);
    }

    #loadGrid(beatDivision) {
        let beatGrid = document.getElementById('beat-grid');
        beatGrid.appendChild(creatRow('crash', beatDivision));
        beatGrid.appendChild(creatRow('closed hi-hat', beatDivision));
        beatGrid.appendChild(creatRow('snare', beatDivision));
        beatGrid.appendChild(creatRow('floor tom', beatDivision));
        beatGrid.appendChild(creatRow('kick', beatDivision));
    }
}

window.BeatGrid = BeatGrid;
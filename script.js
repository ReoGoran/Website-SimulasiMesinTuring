function startSimulation() {
    let inputString = document.getElementById('inputArray').value;
    let arr = inputString.split(',').map(Number);
  
    let stepsList = document.getElementById('steps-list');
    stepsList.innerHTML = '';
    let tape = arr.slice();
  
    const tapeContainer = document.getElementById("tape");
    const head = document.getElementById("head");
  
    tapeContainer.innerHTML = '';
    document.getElementById('finalResult').textContent = '';
  
    function updateTape(activeIndex = null) {
        tapeContainer.innerHTML = '';
        tape.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.className = 'tape-cell';
            if (index === activeIndex) cell.classList.add('active');
            cell.textContent = value;
            tapeContainer.appendChild(cell);
        });
    }
  
    function moveHead(position) {
        const cellWidth = 60;
        head.style.left = `${position * cellWidth}px`;
    }
  
    function logStep(stepDesc, transition, currentArray) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.innerHTML = `
            <div>${stepDesc}</div>
            <div>Proses: ${transition}</div>
            <div>Angka Sementara: [${currentArray.join(', ')}]</div>
        `;
        stepsList.appendChild(stepDiv);
    }
  
    async function bubbleSortWithAnimation() {
        let n = tape.length;
        let sorted = false;
  
        for (let i = 0; i < n - 1 && !sorted; i++) {
            sorted = true;
            for (let j = 0; j < n - i - 1; j++) {
                moveHead(j);
                updateTape(j);
                await new Promise((resolve) => setTimeout(resolve, 700));
  
                logStep(
                    `Bandingkan ${tape[j]} dan ${tape[j + 1]}`,
                    `δ(q${j}, ${tape[j]}) → q${j + 1} | move: R`,
                    tape
                );
  
                if (tape[j] > tape[j + 1]) {
                    [tape[j], tape[j + 1]] = [tape[j + 1], tape[j]];
                    updateTape(j + 1);
                    moveHead(j + 1);
                    await new Promise((resolve) => setTimeout(resolve, 700)); // Tunggu animasi
                    logStep(
                        `Tukar ${tape[j]} dan ${tape[j + 1]}`,
                        `δ(q${j + 1}, ${tape[j]}) → q${j} | move: L`,
                        tape
                    );
                    sorted = false;
                } else {
                    logStep(
                        `Tidak ada pertukaran untuk ${tape[j]} dan ${tape[j + 1]}`,
                        `δ(q${j}, ${tape[j]}) → q${j} | move: L`,
                        tape
                    );
                }
            }
        }
    }
  
    updateTape();
    bubbleSortWithAnimation().then(() => {
        document.getElementById('finalResult').textContent = `Array Terurut: [${tape.join(', ')}]`;
    });
  }
  
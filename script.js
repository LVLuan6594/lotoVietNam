let numbers = [];
    let daQuay = [];
    let gameStarted = false;

    // Khôi phục dữ liệu từ localStorage
    function loadData() {
      const saved = localStorage.getItem('lotoGame');
      if (saved) {
        const data = JSON.parse(saved);
        numbers = data.numbers;
        daQuay = data.daQuay;
        gameStarted = data.gameStarted;
      } else {
        // Tạo mảng 1 → 90
        for (let i = 1; i <= 90; i++) {
          numbers.push(i);
        }
      }
      updateUI();
    }

    // Lưu dữ liệu vào localStorage
    function saveData() {
      const data = {
        numbers: numbers,
        daQuay: daQuay,
        gameStarted: gameStarted
      };
      localStorage.setItem('lotoGame', JSON.stringify(data));
    }

    // Cập nhật giao diện
    function updateUI() {
      const btnQuay = document.getElementById("btnQuay");
      const btnBatDau = document.getElementById("btnBatDau");
      const btnTranMoi = document.getElementById("btnTranMoi");

      if (gameStarted) {
        btnBatDau.disabled = true;
        btnQuay.disabled = numbers.length === 0;
        btnTranMoi.disabled = false;
      } else {
        btnBatDau.disabled = false;
        btnQuay.disabled = true;
        btnTranMoi.disabled = true;
      }

      renderList();
    }

    // Bắt đầu trận chơi
    function batDau() {
      gameStarted = true;
      saveData();
      updateUI();
    }

    // Quay số
    function quaySo() {
      if (numbers.length === 0) {
        document.getElementById("currentNumber").innerText = "HẾT";
        document.getElementById("btnQuay").disabled = true;
        return;
      }

      // Random index
      let index = Math.floor(Math.random() * numbers.length);

      // Lấy số
      let so = numbers.splice(index, 1)[0];

      daQuay.push(so);

      // Hiển thị số vừa quay
      document.getElementById("currentNumber").innerText = so;

      // Hiệu ứng chúc mừng
      showCongratulations(so);

      // Cập nhật dữ liệu
      saveData();
      updateUI();
    }

    // Hiệu ứng chúc mừng
    function showCongratulations(number) {
      const congrats = document.createElement("div");
      congrats.className = "congratulations";
      congrats.innerText = "🎉 Số: " + number + "! 🎉";
      document.body.appendChild(congrats);

      setTimeout(() => {
        congrats.remove();
      }, 1500);
    }

    // Trận mới
    function tranMoi() {
      numbers = [];
      daQuay = [];
      gameStarted = false;

      // Tạo mảng 1 → 90
      for (let i = 1; i <= 90; i++) {
        numbers.push(i);
      }

      document.getElementById("currentNumber").innerText = "--";
      saveData();
      updateUI();
    }

    // Render danh sách số đã quay
    function renderList() {
      const listDiv = document.getElementById("listNumber");
      listDiv.innerHTML = "";

      daQuay.forEach(n => {
        const span = document.createElement("span");
        span.innerText = n;
        listDiv.appendChild(span);
      });
    }

    // Khôi phục dữ liệu khi tải trang
    loadData();
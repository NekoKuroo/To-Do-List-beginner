const inputTask = document.getElementById('taskInput');
const tombolBtn = document.querySelector('#addBtn');
const listTaskPending = document.getElementById('taskListPending');
const listTaskDone = document.getElementById('taskListDone');

// Fungsi buat item tugas, tambahan parameter status (true = done, false = pending)
function buatItemTugas(teks, isDone = false) {
  const li = document.createElement('li');

  // Wrapper untuk teks dan tombol
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('li-content');

  // Teks tugas
  const span = document.createElement('span');
  span.textContent = teks.toLowerCase();

  // Tombol hapus
  const hapusBtn = document.createElement('button');
  hapusBtn.textContent = "hapus";
  hapusBtn.addEventListener('click', function () {
    li.remove();
    simpanKeLocalStorage();
  });

  // Checkbox
  const checkBox = document.createElement('input');
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("class", "checkBtn");
  checkBox.checked = isDone;

  checkBox.addEventListener('click', function () {
    if (checkBox.checked) {
      span.style.textDecoration = 'line-through';
      span.style.color = 'gray';
     
      listTaskDone.appendChild(li); // pindahkan ke tugas wselesai
    } else {
      span.style.textDecoration = 'none';
      span.style.color = 'black';
      li.style.backgroundColor = '#cce5ff';
      listTaskPending.appendChild(li); // pindahkan ke tugas belum selesai
    }
    simpanKeLocalStorage(); //simpan perubahan
  });

  // Atur style dan tempatkan ke list yang sesuai saat 'page' direfresh (karna tersimpan didalam localstorage makanya harus bikin tampilannya)
if (isDone) {
    span.style.textDecoration = 'line-through';
    span.style.color = 'gray';
    listTaskDone.appendChild(li);
    
  } else {
    li.style.backgroundColor = 'black';
    listTaskPending.appendChild(li);
  }

  // Susun elemen
  contentDiv.appendChild(span);
  contentDiv.appendChild(hapusBtn);

  li.appendChild(contentDiv);
  li.appendChild(checkBox);

  li.style.backgroundColor = '#cce5ff';// Default background warna untuk item baru

  return li;
}

// function untuk menyimpan semua 'task' ke localstorage
function simpanKeLocalStorage() {
  const pendingTask = []; // buat inisiasi utk menyimpan object nya
  listTaskPending.querySelectorAll('li span').forEach(span => {
    pendingTask.push(span.textContent);
  });

  const doneTask = [];
  listTaskDone.querySelectorAll('li span').forEach(span => {
    doneTask.push(span.textContent);
  });

  const data = {
    pending: pendingTask,
    done: doneTask
  };
  localStorage.setItem('task', JSON.stringify(data));
  //JSON.parse(...): mengubah data teks JSON menjadi object JavaScript.
}

// function untuk memuat data dari localstorage
  function muatDariLocalStorage() {
    const data = JSON.parse(localStorage.getItem('task'));
    if(!data) return;

    data.pending.forEach(taskText => {
      buatItemTugas(taskText, false);
    });

    data.done.forEach(taskText => {
      buatItemTugas(taskText, true);
    });

  }

// Event ketika tombol ditekan
tombolBtn.addEventListener('click', function () {
    const ambilInput = inputTask.value.trim();
    if (ambilInput === '' ) return;

    buatItemTugas(ambilInput, false);
    inputTask.value = '';
    simpanKeLocalStorage();
});
    window.addEventListener('load', muatDariLocalStorage);



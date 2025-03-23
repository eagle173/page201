document.getElementById('comboBox').addEventListener('change', function() {
    const additionalFields = document.getElementById('additionalFields');
    additionalFields.innerHTML = ''; // 기존 필드 초기화

    if (this.value === '영혼각차') {
        const fields = [
            '신청', '이름', '성별', '음력생일', '사주팔자', '한자주소', '피드백', '요구', '통령사지정'
        ];

        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field + ':';
            const input = document.createElement('input');
            input.type = 'text';
            input.name = field;
            input.required = true;
            additionalFields.appendChild(label);
            additionalFields.appendChild(input);
            additionalFields.appendChild(document.createElement('br'));
            additionalFields.appendChild(document.createElement('br'));
        });
    }
});

document.getElementById('submissionForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지

    const formData = new FormData(this);
    const emailContent = Array.from(formData.entries()).map(entry => `${entry[0]}: ${entry[1]}`).join('\n');

    console.log("Form Data:", Object.fromEntries(formData.entries())); // 폼 데이터 로그 출력
    console.log("Email Content:", emailContent); // 이메일 내용 로그 출력
});

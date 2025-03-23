const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const { email, name, subject, message } = JSON.parse(event.body);

    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
        service: 'gmail', // 예: Gmail을 사용하는 경우
        auth: {
            user: process.env.EMAIL_USER, // 환경 변수에서 이메일 사용자 이름 가져오기
            pass: process.env.EMAIL_PASS  // 환경 변수에서 이메일 비밀번호 가져오기
        }
    });

    const mailOptions = {
        from: email, // 폼에서 입력된 이메일 주소
        to: process.env.ADMIN_EMAIL, // 환경 변수에서 관리자의 이메일 주소 가져오기
        subject: subject,
        text: message
    };

    try {
        console.log('메일 옵션:', mailOptions); // 메일 옵션 로그 출력
        await transporter.sendMail(mailOptions);
        console.log('이메일 전송 성공');
        return {
            statusCode: 200,
            body: JSON.stringify({ message: '이메일이 성공적으로 전송되었습니다!' })
        };
    } catch (error) {
        console.error('이메일 전송 실패:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `이메일 전송에 실패했습니다: ${error.message}` })
        };
    }
};


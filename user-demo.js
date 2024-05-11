// expresss 모듈 세팅
const expresss = require('express')
const app = expresss()
app.listen(3000)
app.use(expresss.json())

db = new Map()
let id = 1

//로그인
app.post('/signIn', (req, res) => {})

//회원 가입
app.post('/signUp', (req, res) => {
  console.log(req.body)
  db.set(id++, req.body)
  const userName = req.body.userName
  if (userName) {
    res.status(201).json({
      message: `${db.get(id - 1).userName}님, 회원 가입이 완료되었습니다.`,
    })
  } else {
    res.status(400).json({
      message: '입력 값을 확인해주세요.',
    })
  }
})

//개별 조회 및 탈퇴
app
  .route('users/:id')
  .get((req, res) => {
    let { id } = req.params
    id = parseInt(id)
    const user = db.get(id)

    if (user) {
      res.status(200).json({
        userId: user.userId,
        name: user.userName,
      })
    } else {
      res.status(404).json({
        message: '회원 정보를 찾을 수 없습니다.',
      })
    }
  })

  .delete((req, res) => {
    let { id } = req.params
    id = parseInt(id)
    const user = db.get(id)

    if (user) {
      db.delete(id)
      res.status(200).json({
        message: `${user.userName}님, 다음에 또 뵙겠습니다.`,
      })
    } else {
      res.status(404).json({
        message: '회원 정보를 찾을 수 없습니다.',
      })
    }
  })

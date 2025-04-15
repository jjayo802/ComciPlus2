import { useEffect, useState } from 'react';
import './App.css'
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import { useLocation } from 'react-router-dom';

function App() {
  
  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "500px",
      height: "500px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "#2D2D2D",
      justifyContent: "center",
      overflow: "auto",
      borderColor: "#FFFFFF",
    },
  };
  
  //?districtId=E10&schoolId=7310059&grade=3&classNm=3

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [isMemoOpen, setMemoOpen] = useState(false);
  const [memoContent, setMemoContent] = useState("");
  const [memoYmd, setMemoYmd] = useState("");
  const [memoPeriod, setMemoPeriod] = useState(0);
  const [postUrl, setPostUrl] = useState("http://localhost:8080/api/timetables/memo");
  const [timetables, setTimetables] = useState([[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}]]);
  const [meals, setMeals] = useState([{},{},{},{},{}]);

  const getTables = async() => {
    const timetable = await fetch('http://localhost:8080/api/timetables' + location.search)
      .then((timetable) => timetable.json());
    console.log(timetable);
    setTimetables(timetable);
  }

  const getMeals = async() => {
    const meals = await fetch('http://localhost:8080/api/meals' + location.search)
      .then((meals) => meals.json());
    console.log(meals);
    setMeals(meals);
  }

  useEffect(() => {
    getTables();
    getMeals();
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault(); // ✅ 기본 폼 제출 막기

    const formData = new FormData(e.target);

    // 필요한 데이터 꺼내기
    const data = Object.fromEntries(formData.entries());

    // POST 요청 보내기 (예: fetch)
    fetch('http://localhost:8080/api/timetables/memo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ 중요!
      },
      body: JSON.stringify(data), // ✅ JSON 문자열로 변환
    })
    .then(response => response.text())
    .then(result => {
      console.log('성공:', result);
      // 여기서 모달 닫거나 알림 띄우기
      setMemoOpen(false);
      getTables();
    })
    .catch(error => {
      console.error('에러:', error);
    });
  };

  const formatTextWithLineBreaks = (text) => {
    // 텍스트가 undefined나 null일 경우 빈 문자열로 처리
    if (!text) return null;
  
    return text.split("\n").map((item, index) => {
      return (
        <span key={index}>
          {item}
          <br />
        </span>
      );
    });
  }; 

  return (
    <div className="App">
      <Modal isOpen={isMemoOpen} ariaHideApp={false} style={customModalStyles} shouldCloseOnOverlayClick={true}>
          <h1 className='memoTitle'>메모 입력</h1>
          <form action={postUrl} onSubmit={handleSubmit}>
            <div className='textWrapper'>
              <textarea name="postMemo" cols="10" rows="10" id="postMemoInput" value={memoContent} onChange={(e) => setMemoContent(e.target.value)}></textarea>
            </div>
            <div className='memoConfirm'>
              <button className='memoConfirmButton' >확인</button>
              <button type='button' onClick={() => setMemoOpen(false)}>취소</button>
            </div>
            <input name="schoolId" type='hidden' value={searchParams.get('schoolId')}></input>
            <input name="grade" type='hidden' value={searchParams.get('grade')}></input>
            <input name="classNm" type='hidden' value={searchParams.get('classNm')}></input>
            <input name="ymd" type='hidden' value={memoYmd}></input>
            <input name="period" type='hidden' value={memoPeriod}></input>
          </form>
      </Modal>
      <main>
      <div id="timetable">
            <div className="header">
                <div className="title">시간표</div>
            </div>
            <div className="body">
                <table>
                    <thead>
                      <tr>
                        <th scope="col">월</th>
                        <th scope="col">화</th>
                        <th scope="col">수</th>
                        <th scope="col">목</th>
                        <th scope="col">금</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          {GetTableTD(0,0,timetables)}
                          {GetTableTD(1,0,timetables)}
                          {GetTableTD(2,0,timetables)}
                          {GetTableTD(3,0,timetables)}
                          {GetTableTD(4,0,timetables)}
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                          {GetTableTD(0,1,timetables)}
                          {GetTableTD(1,1,timetables)}
                          {GetTableTD(2,1,timetables)}
                          {GetTableTD(3,1,timetables)}
                          {GetTableTD(4,1,timetables)}
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                          {GetTableTD(0,2,timetables)}
                          {GetTableTD(1,2,timetables)}
                          {GetTableTD(2,2,timetables)}
                          {GetTableTD(3,2,timetables)}
                          {GetTableTD(4,2,timetables)}
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                          {GetTableTD(0,3,timetables)}
                          {GetTableTD(1,3,timetables)}
                          {GetTableTD(2,3,timetables)}
                          {GetTableTD(3,3,timetables)}
                          {GetTableTD(4,3,timetables)}
                        </tr>
                    </tbody>
                    <tbody>
                          <tr>
                              <td colSpan="5" id="lunchtime">점심시간</td>
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                          {GetTableTD(0,4,timetables)}
                          {GetTableTD(1,4,timetables)}
                          {GetTableTD(2,4,timetables)}
                          {GetTableTD(3,4,timetables)}
                          {GetTableTD(4,4,timetables)}
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                          {GetTableTD(0,5,timetables)}
                          {GetTableTD(1,5,timetables)}
                          {GetTableTD(2,5,timetables)}
                          {GetTableTD(3,5,timetables)}
                          {GetTableTD(4,5,timetables)}
                        </tr>
                    </tbody>
                    <tbody>
                        <tr>
                          {GetTableTD(0,6,timetables)}
                          {GetTableTD(1,6,timetables)}
                          {GetTableTD(2,6,timetables)}
                          {GetTableTD(3,6,timetables)}
                          {GetTableTD(4,6,timetables)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div id="lunchtable">
            <div className="header">
                <div className="title">급식</div>
            </div>
            <div className="body">
                <div className="title">월</div>
                {GetMealDiv(0,meals)}
                <div className="title">화</div>
                {GetMealDiv(1,meals)}
                <div className="title">수</div>
                {GetMealDiv(2,meals)}
                <div className="title">목</div>
                {GetMealDiv(3,meals)}
                <div className="title">금</div>
                {GetMealDiv(4,meals)}
            </div>
        </div>
    </main>

    </div>
  );

  function GetTableTD(day, period, timetables) 
  {
    return (
      <td className="memo" onClick={() => {
        setMemoOpen(true);
        setMemoPeriod(timetables[day][period].period);
        setMemoYmd(timetables[day][period].ymd);
        setMemoContent(timetables[day][period].memo);
      }}>
        <span className='timetableTitle'>{timetables[day][period] ? timetables[day][period].name : ""}</span>
        <br />
        <div className='timetableMemo'>
          {formatTextWithLineBreaks(timetables[day][period] ? timetables[day][period].memo : "")}
        </div>
      </td>
    );
  }

  function GetMealDiv(day, meals)
  {
    return (
      <div className="box">
          {meals[day].meal ? meals[day].meal.replace(/<br\s*\/?>/gi, "\n") : ""}
      </div>
    )
  }
} 

export default App;

import { useEffect, useState } from 'react';
import './App.css'
import Modal from 'react-modal';
import ReactModal from 'react-modal';

function App() {
  
  const customModalStyles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
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
      backgroundColor: "gray",
      justifyContent: "center",
      overflow: "auto",
    },
  };
  
  const [isMemoOpen, setMemoOpen] = useState(false);
  const [postUrl, setPostUrl] = useState("localhost:8080");
  const [timetables, setTimetables] = useState([[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}],[{},{},{},{},{},{},{}]]);

  const getTables = async() => {
    const timetable = await fetch('http://localhost:8080/api/timetables?districtId=E10&schoolId=7310059&grade=3&classNm=3')
      .then((timetable) => timetable.json());
    console.log(timetable);
    setTimetables(timetable);
  }

  useEffect(() => {
    getTables();
  }, []);
  

  return (
    <div className="App">
      <Modal isOpen={isMemoOpen} ariaHideApp={false} style={customModalStyles} shouldCloseOnOverlayClick={true}>
          <h1 className='memoTitle'>메모 입력</h1>
          <form action={postUrl} method='post'>
            <div className='textWrapper'><textarea name="postMemo" cols="10" rows="10" id="postMemoInput"></textarea></div>
            <div className='memoConfirm'><button className='memoConfirmButton' >확인</button><button type='button' onClick={() => setMemoOpen(false)}>취소</button></div>
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
                            <td className="memo" onClick={() => {setMemoOpen(true)}}>{timetables[0][0].name}<br /><span>메모메모</span></td>
                            {GetTableTD(0,1,timetables)}
                            <td className="memo">1교시<br /><span><textarea></textarea></span></td>
                            <td className="memo">1교시<br /><span><textarea></textarea></span></td>
                            <td className="memo">1교시<br /><span><textarea></textarea></span></td>
                          </tr>
                      </tbody>
                    <tbody>
                          <tr>
                              <td colSpan="5" id="lunchtime">점심시간</td>
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
                <div className="box">
                    미나리 국밥
                </div>
                <div className="title">월</div>
                <div className="box">
                    미나리 국밥
                </div>
            </div>
        </div>
    </main>

    </div>
  );

  function GetTableTD(day, period, timetables) 
  {
    return <td className="memo" onClick={() => {setMemoOpen(true)}}><b>{timetables[day][period].name}</b><br /><span>{timetables[day][period].memo}</span></td>
  }
} 

export default App;

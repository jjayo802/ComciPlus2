import { use, useEffect, useState } from 'react';
import './Select.css'

function Select() {

    const [districtId, setDistrictId] = useState("");
    const [schoolId, setSchoolId] = useState("");
    const [grade, setGrade] = useState("");
    const [className, setClassName] = useState("");

    const [schoolName, setSchoolName] = useState("");
    const [loadedSchools, setLoadedSchools] = useState([]);
    const [loadedClasses, setLoadedClasses] = useState([]);
    
    const loadSchoolResults = async(schoolName) => {
        const searchParams = new URLSearchParams();
        searchParams.set("districtId", districtId);
        searchParams.set("schoolName", schoolName);
        const results = await fetch('http://localhost:8080/api/schools?' + searchParams.toString())
            .then((results) => results.json());
        
        setLoadedSchools(results);
    }

    const loadSchoolClasses = async(grade) => {
        const searchParams = new URLSearchParams();
        searchParams.set("districtId", districtId);
        searchParams.set("schoolId", schoolId);
        searchParams.set("grade", grade);
        const results = await fetch('http://localhost:8080/api/classes?' + searchParams.toString())
            .then((results) => results.json());

        setLoadedClasses(results);
    }

    return (
        <main>
            <div id="selection">
                <div className="header">
                    <div className="title">학교 선택</div>
                </div>
                <div className="body">
                    <div className="selection-box">
                        <label htmlFor="district">학군:</label>
                        <select id="district" onChange={(e) => {setDistrictId(e.target.value);}}>
                            <option value="" disabled>학군을 선택하세요</option>
                            <option value="B10">서울특별시교육청</option>
                            <option value="C10">부산광역시교육청</option>
                            <option value="D10">대구광역시교육청</option>
                            <option value="E10">인천광역시교육청</option>
                            <option value="F10">광주광역시교육청</option>
                            <option value="G10">대전광역시교육청</option>
                            <option value="H10">울산광역시교육청</option>
                            <option value="I10">세종특별자치시교육청</option>
                            <option value="J10">경기도교육청</option>
                            <option value="K10">강원도교육청</option>
                            <option value="M10">충청북도교육청</option>
                            <option value="N10">충청남도교육청</option>
                            <option value="P10">전북특별자치도교육청</option>
                            <option value="Q10">전라남도교육청</option>
                            <option value="R10">경상북도교육청</option>
                            <option value="S10">경상남도교육청</option>
                            <option value="T10">제주특별자치도교육청</option>
                        </select>
                    </div>
                    <div className="selection-box">
                        <label htmlFor="school-search">학교 검색:</label>
                        {GetSearchWrapper()}
                        <ul id="school-results" className="search-results" style={{ display: loadedSchools.length != 0 && schoolId == "" ? 'block' : 'none'}}>
                            {GetSchoolResults()}
                        </ul>
                    </div>
                    <div className="selection-box">
                        <label htmlFor="grade">학년:</label>
                        <select id="grade" disabled={schoolId == ""} onChange={(e) => {setGrade(e.target.value); loadSchoolClasses(e.target.value);}}>
                            <option value="" disabled>학년을 선택하세요</option>
                            <option value="1">1학년</option>
                            <option value="2">2학년</option>
                            <option value="3">3학년</option>
                        </select>
                    </div>
                    <div className="selection-box">
                        <label htmlFor="class">반:</label>
                        <select id="class" disabled={grade == ""} onChange={(e) => {
                            setClassName(e.target.value);
                        }}>
                            <option value="" disabled>반을 선택하세요</option>
                            {GetClassResults()}
                        </select>
                    </div>
                    <button id="submit-button" disabled={className==""} onClick={() => {
                        const searchParams = new URLSearchParams();
                        searchParams.set("districtId", districtId);
                        searchParams.set("schoolId", schoolId);
                        searchParams.set("grade", grade);
                        searchParams.set("classNm", className);
                        location.href = "/timetables?" + searchParams.toString();
                    }}>확인</button>
                </div>
            </div>
        </main>
    );

    function GetSchoolResults(){
        var indents = [];
        for (var i = 0; i < loadedSchools.length; i++) {
            const id = loadedSchools[i].id;
            const name = loadedSchools[i].name;
            indents.push(<li key={i} onClick={() => {
                setSchoolName(name);
                setSchoolId(id);
            }}>{loadedSchools[i].name}</li>);
        }
        return indents;
    }

    function GetClassResults(){
        var indents = [];
        for (var i = 0; i < loadedClasses.length; i++) {
            const id = loadedClasses[i].id;
            const name = loadedClasses[i].name;
            indents.push(<option value={name}>{name}</option>);
        }
        return indents;
    }

    function GetSearchWrapper(){
        if(schoolId != ""){
            return (
                <div className="search-wrapper">
                    <input type="text" id="school-search" value={schoolName} disabled/>
                </div>
            );
        }

        return (
            <div className="search-wrapper">
                <input type="text" id="school-search" placeholder="학교를 검색하세요" disabled={districtId == ""} value={schoolName} onChange={(e) => { 
                    const value = e.target.value;
                    setSchoolName(value);
                    loadSchoolResults(value);
                }}/>
            </div>
        );
    }
}

export default Select;
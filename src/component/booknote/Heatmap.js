import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './Heatmap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function Heatmap() {
  const [values, setValues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/notelist/user');
      const notes = res.data;
  
      const countByDate = {};
      notes.forEach((note) => {
        const dateStr = new Date(note.createdAt).toLocaleDateString('en-US');
        if (dateStr in countByDate) {
          countByDate[dateStr]++;
        } else {
          countByDate[dateStr] = 1;
        }
      });
  
      const today = new Date();
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
   
      const newValues = [];
      
      for (let i = 0; i < 50; i++) {
        const dateStr = date.toLocaleDateString('en-US');
        const count = countByDate[dateStr] || 0;
        if (count !== 0) {
          newValues.push({ date: dateStr, count });

        } 
        date.setDate(date.getDate()-1);
    
      }
  
      setValues(newValues);
    };
   
    fetchData();
  }, []);

  const classForValue = (value) => {
    if (!value) {
        return 'color-empty';
      }
      return `color-scale-${Math.floor(value.count / 4) * 4}`;
  };
  return (
    <Row className="dsds">
      <Col md={9} style={{ height: '100px' }}>
        <div style={{ height: '100px' }}>
          <CalendarHeatmap
            values={values}
            showWeekdayLabels={true}
            showMonthLabels={true}
            classForValue={classForValue}
          />
        </div>
      </Col>
      <Col md={3}> 
        <span className="color-text">less</span>
        <span className="color-box color-scale-0" />
        <span className="color-box color-scale-4" />
        <span className="color-box color-scale-8" />
        <span className="color-box color-scale-12" />
        <span >more</span>
     </Col>
    </Row>
  );
}

export default Heatmap
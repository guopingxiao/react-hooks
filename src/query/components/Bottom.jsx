import React, {
  memo,
  useCallback,
  useState
} from 'react'
import PropTypes from 'prop-types'
import './Bottom.css'
import Slider from './Slider'
import { ORDER_DEPART } from '../redux/constant'

const Filter = memo(function Filter(props) {
  const {
      name,
      checked,
      value,
      toggle,
  } = props;

  return (
      <li className={`${checked? 'checked': ''}`} onClick={() => toggle(value)}>
          { name }
      </li>
  );
});
Filter.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

// 筛选框单个筛选类目
const Option = memo(function Option(props) {
  const {
      title,
      options,
      checkedMap,
      update,
  } = props;

  // 定义选择切换函数，传递给Filter组件，因为有没有选中，需要Option组件的checkMap组件确认；定义新的newCheckedMap判断
  const toggle = useCallback((value) => { // value为 Filter组件传递的值
    const newCheckedMap = {...checkedMap};

    if (value in checkedMap) { // 去除选择
        delete newCheckedMap[value];
    } else {
        newCheckedMap[value] = true; // 选择
    }

    update(newCheckedMap); // 调用setLocalCheckMaps来更新Option组件的state
  }, [checkedMap, update]);


  return (
      <div className="option">
          <h3>{ title }</h3>
          <ul>
          {
              options.map(option => {
                  return (
                      <Filter
                          key={option.value}
                          {...option}
                          checked={option.value in checkedMap}
                          toggle={toggle}/>
                  );
              })
          }
          </ul>
      </div>
  );
});
Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired
};

// 底部综合筛选浮层Model
const BottomModal = memo(function BottomModal(props) {
  const {
      ticketTypes,
      trainTypes,
      departStations,
      arriveStations,
      checkedTicketTypes,
      checkedTrainTypes,
      checkedDepartStations,
      checkedArriveStations,
      departTimeStart,
      departTimeEnd,
      arriveTimeStart,
      arriveTimeEnd,
  } = props;

    const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState(() => {
        return {
            ...checkedTicketTypes,
        };
    });

    const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState(() => {
      return {
          ...checkedTrainTypes,
      };
  });

    const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState(() => {
        return {
            ...checkedDepartStations,
        };
    });

    const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState(() => {
        return {
            ...checkedArriveStations,
        };
    })
  
    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const optionGroup = [
      {
          title: '坐席类型',
          options: ticketTypes,
          checkedMap: localCheckedTicketTypes,
          update: setLocalCheckedTicketTypes,
      },
      {
          title: '车次类型',
          options: trainTypes,
          checkedMap: localCheckedTrainTypes,
          update: setLocalCheckedTrainTypes,
      },
      {
          title: '出发车站',
          options: departStations,
          checkedMap: localCheckedDepartStations,
          update: setLocalCheckedDepartStations
      },
      {
          title: '到达车站',
          options: arriveStations,
          checkedMap: localCheckedArriveStations,
          update: setLocalCheckedArriveStations,
      }
    ];

  return (
      <div className="bottom-modal">
          <div className="bottom-dialog">
              <div className="bottom-dialog-content">
                  <div className="title">
                      <span className="reset">
                          重置
                      </span>
                      <span className="ok">
                          确定
                      </span>
                  </div>
                  <div className="options">
                    {
                        optionGroup.map(group => <Option {...group} key={group.title}/>)
                    }
                      <Slider
                        title="出发时间"
                        currentStartHours={localDepartTimeStart}
                        currentEndHours={localDepartTimeEnd}
                        onStartChanged={setLocalDepartTimeStart}
                        onEndChanged={setLocalDepartTimeEnd}
                      />
                      <Slider
                        title="到达时间"
                        currentStartHours={localArriveTimeStart}
                        currentEndHours={localArriveTimeEnd}
                        onStartChanged={setLocalArriveTimeStart}
                        onEndChanged={setLocalArriveTimeEnd}
                      />
                  </div>
              </div>
          </div>
      </div>
  );
});
BottomModal.propTypes = {
  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired,
  setCheckedTicketTypes: PropTypes.func.isRequired,
  setCheckedTrainTypes: PropTypes.func.isRequired,
  setCheckedDepartStations: PropTypes.func.isRequired,
  setCheckedArriveStations: PropTypes.func.isRequired,
  setDepartTimeStart: PropTypes.func.isRequired,
  setDepartTimeEnd: PropTypes.func.isRequired,
  setArriveTimeStart: PropTypes.func.isRequired,
  setArriveTimeEnd: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
};

// 底部筛选按钮
export default function Bottom(props) { 
  const { 
    toggleHighSpeed,
    toggleIsFiltersVisible,
    toggleOnlyTickets,
    toggleOrderType,
    highSpeed,
    orderType,
    onlyTickets,
    isFiltersVisible,

    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,

    setCheckedTicketTypes,
    setCheckedTrainTypes,
    setCheckedDepartStations,
    setCheckedArriveStations,
    setDepartTimeStart,
    setDepartTimeEnd,
    setArriveTimeStart,
    setArriveTimeEnd
  } = props
  
  return (
    <div className="bottom">
        <div className="bottom-filters">
            <span className="item item-on" onClick={toggleOrderType}>
                <i className="icon">&#xf065;</i>
                { orderType === ORDER_DEPART ? '出发 早→晚' : '耗时 短→长' }
            </span>
            <span
                className={`item ${highSpeed ? 'item-on':'' }`}
                onClick={toggleHighSpeed}
            >
                <i className="icon">{ highSpeed ? '\uf43f' : '\uf43e' }</i>
                只看高铁动车
            </span>
            <span
                className={`item ${onlyTickets ? 'item-on':'' }`}
                onClick={toggleOnlyTickets}
            >
                <i className="icon">{ onlyTickets ? '\uf43d' : '\uf43c' }</i>
                只看有票
            </span>
            <span
                className={`item ${isFiltersVisible ? 'item-on' : ''}`}
                onClick={toggleIsFiltersVisible}
            >
                <i className="icon">{ '\uf0f7' }</i>
                综合筛选
            </span>
      </div>
      {
        isFiltersVisible && (
            <BottomModal
                ticketTypes={ticketTypes}
                trainTypes={trainTypes}
                departStations={departStations}
                arriveStations={arriveStations}
                checkedTicketTypes={checkedTicketTypes}
                checkedTrainTypes={checkedTrainTypes}
                checkedDepartStations={checkedDepartStations}
                checkedArriveStations={checkedArriveStations}
                departTimeStart={departTimeStart}
                departTimeEnd={departTimeEnd}
                arriveTimeStart={arriveTimeStart}
                arriveTimeEnd={arriveTimeEnd}
                setCheckedTicketTypes={setCheckedTicketTypes}
                setCheckedTrainTypes={setCheckedTrainTypes}
                setCheckedDepartStations={setCheckedDepartStations}
                setCheckedArriveStations={setCheckedArriveStations}
                setDepartTimeStart={setDepartTimeStart}
                setDepartTimeEnd={setDepartTimeEnd}
                setArriveTimeStart={setArriveTimeStart}
                setArriveTimeEnd={setArriveTimeEnd}
                toggleIsFiltersVisible={toggleIsFiltersVisible}
            />
        )
      }
    </div>
  );
}


Bottom.propTypes = {
  toggleOrderType: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  orderType: PropTypes.number.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired,

  ticketTypes: PropTypes.array.isRequired,
  trainTypes: PropTypes.array.isRequired,
  departStations: PropTypes.array.isRequired,
  arriveStations: PropTypes.array.isRequired,
  checkedTicketTypes: PropTypes.object.isRequired,
  checkedTrainTypes: PropTypes.object.isRequired,
  checkedDepartStations: PropTypes.object.isRequired,
  checkedArriveStations: PropTypes.object.isRequired,
  departTimeStart: PropTypes.number.isRequired,
  departTimeEnd: PropTypes.number.isRequired,
  arriveTimeStart: PropTypes.number.isRequired,
  arriveTimeEnd: PropTypes.number.isRequired
};

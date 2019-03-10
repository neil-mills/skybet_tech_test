import React, { Fragment, Component } from 'react';
import Header from '../components/Header';
import { Switch, Route } from 'react-router-dom';
import BetSlip from '../components/BetSlip';
import LiveEvents from '../components/LiveEvents';
import EventDetail from '../components/EventDetail';
import styled from "styled-components";
let Body = styled.main`
    display: grid;
    grid-template-columns: 1fr 270px;
    grid-gap: 10px;
`;
const Content = styled.div`
    display: block;
    padding: 4px;
`;
let Side = styled.aside`
    background-color: ${props => props.theme.sbLtBlue};
    padding: 6px;
`;

export default class EventsContainer extends Component {
    render() {
        return (
            <div>
                <Header />
                <Body>
                    <Content className="page-content">
                        <Switch>
                            <Route exact path={'/'} component={LiveEvents} />
                            <Route exact path={'/event/:eventId'} component={EventDetail} />
                        </Switch>
                    </Content>
                    <Side>
                        <BetSlip />
                    </Side>
                </Body>
            </div>
        )
    }
}

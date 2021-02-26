import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    }
    
    return (
        <div id="main-footer" className="main-footer">
            <Row>
                <Col>
                    <p className="copyright">Copyright &copy; <span>{thisYear()}</span> JeonMinJae</p>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
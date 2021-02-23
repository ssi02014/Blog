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
                    <p>Copyright &copy; <span>{thisYear()}</span> Jeon Min Jae</p>
                </Col>
            </Row>
        </div>
    );
};

export default Footer;
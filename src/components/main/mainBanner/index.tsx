import styled from 'styled-components';
import MainImage from 'assets/img/main_img.png';

const MainBanner = () => {
    //render
    return (
        <MainBannerTemp>
            <div>
                <img src={MainImage} />
            </div>
            <p>당신의 가능성에 도전하세요</p>
            <p>프리온보딩, 프론트엔드</p>
        </MainBannerTemp>
    );
};
export default MainBanner;

const MainBannerTemp = styled.div`
    width: 550px;
    height: 100%;
    background-color: #ebe4f9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > p:nth-of-type(2) {
        font-weight: bold;
        font-size: 24px;
    }
    & > p:last-child {
        font-weight: bold;
    }
`;

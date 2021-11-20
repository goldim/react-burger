import AppHeader from '../app-header'

const PageWithAppHeader = (props) => (
    <>
        <AppHeader/>
        <main>
            { props.children }
        </main>
    </>
);

export default PageWithAppHeader;
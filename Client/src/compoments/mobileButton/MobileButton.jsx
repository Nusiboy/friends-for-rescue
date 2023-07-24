import './MobileButton.css'
function MobileButton({isMenu, setMenu}) {
    return (
        <label className="burger" htmlFor="burger">
            <input type="checkbox" checked={isMenu ? true : false} onChange={(e) => setMenu(e.target.checked)} id="burger"/>
                <span></span>
                <span></span>
                <span></span>
        </label>
    )
}
export default MobileButton;
import './App.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

const colorContainersList=[
    'amber',
    'green-cyan',
    'orange',
    'cyan',
    'red'
]
class App extends Component{
    state={passwordsList:[],
    websiteInput:'',
    usernameInput:'',
    passwordInput:'',
    showPwd:false,
    isTrue:false,
    }

    onChangeWebsiteName=(event)=>{
        this.setState({websiteInput:event.target.value})
    }

    onChangeUsername=(event)=>{
        this.setState({usernameInput:event.target.value})
    }

    onChangePassword=(event)=>{
        this.setState({passwordInput:event.target.value})
    }

    onClickAdd=(event)=>{
        event.preventDefault()
        const {websiteInput,usernameInput,passwordInput}=this.state
        const getInitialLetter=websiteInput.slice(0,1).toUpperCase()
        const getColor=colorContainersList[Math.floor(Math.random()*5)]
        const newPasswordDetails={
            id:uuidv4(),
            websiteName:websiteInput,
            userName:usernameInput,
            password:passwordInput,
            initialLetter:getInitialLetter,
            colorValue:getColor,
        }
        this.setState(prevState=>({
            passwordsList:[...prevState.passwordsList,newPasswordDetails],
            websiteInput:'',
            usernameInput:'',
            passwordInput:'',
            isTrue:true,
            searchInput:''
        }))
    }

    showPassword=(event)=>{
        if(event.target.checked){
            this.setState({showPwd:true})
        }
        else{
            this.setState({showPwd:false})
        }
    }

    onClickDelete=(id)=>{
        const {passwordsList}=this.state
        const updatedList=passwordsList.filter(eachId=>(eachId.id!==id))
        const updatedListLength=updatedList.length!==0
        this.setState({passwordsList:updatedList,isTrue:updatedListLength})
    }

    searchInputResult=(event)=>{
        this.setState({searchInput:event.target.value})
    }

    render(){
        const {websiteInput,usernameInput,passwordInput,passwordsList,showPwd,searchInput}=this.state
        let {isTrue}=this.state
        const searchResults=passwordsList.filter(each=>(each.websiteName.toLowerCase().includes(searchInput.toLowerCase())))
        if(searchResults.length===0){
            isTrue=false
        }
        else{
            isTrue=true
        }
        return(
            <div className="bg-container">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png" className="logo" alt="app logo"/>
            <div className="bg-sub-container">
            <div className="sub-container1">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png" className="sm-img" alt="password manager"/>
            <form className="form" onSubmit={this.onClickAdd}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png" alt="website" className="images"/>
            <input type="text" className="input" placeholder="Enter Website" value={websiteInput} onChange={this.onChangeWebsiteName}/>
            </div>
            <div className="input-container">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png" alt="username" className="images"/>
            <input type="text" className="input" placeholder="Enter Username" value={usernameInput} onChange={this.onChangeUsername}/>
            </div>
            <div className="input-container">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png" alt="password" className="images"/>
            <input type="password" className="input" placeholder="Enter Password" value={passwordInput} onChange={this.onChangePassword}/>
            </div>
            <button type="submit" className="add-btn">Add</button>
            </form>
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png" className="lg-img" alt="password manager"/>
            </div>
            <div className="sub-container2">
            <div className="header">
            <div className="header-details">
            <h1 className="footer-heading">Your Passwords</h1>
            <p className="length">{passwordsList.length}</p>
            </div>
            <div className="search-container">
            <img src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png" alt="search" className="images"/>
            <input type="search" className="input" placeholder="Search" onChange={this.searchInputResult} value={searchInput}/>
            </div>
            </div>
            <hr/>
            <div className="check-box">
            <input type="checkbox" className="checkbox-inp" id="check" onChange={this.showPassword}/>
            <label htmlFor="check" className="label">Show Passwords</label>
            </div>
            {!isTrue &&(
                <div className="footer">
                <img src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png" className="lg-img" alt="no passwords"/>
                <p className="desc">No Passwords</p>
                </div>
            )}
            {isTrue && (
                <ul className="passwords-list">
                {searchResults.map(eachItem=>(
                    <li className="list-items" key={eachItem.id}>
                    <p className={`initial-color ${eachItem.colorValue}`}>{eachItem.initialLetter}</p>
                    <div className="details">
                    <p className="names">{eachItem.websiteName}</p>
                    <p className="names">{eachItem.userName}</p>
                    {!showPwd && <img src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png" className="stars-img" alt="stars"/>}
                    {showPwd && <p className="names">{eachItem.password}</p>}
                    </div>
                    <button className="delete-btn" type="button" data-testid="delete" onClick={()=>this.onClickDelete(eachItem.id)}>
                    <img src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png" className="delete-img" alt="delete"/>
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
            </div>
            </div>
        )
    }
}

export default App

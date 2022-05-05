import Link from "next/link";
import Image from 'next/image'
import style from '../../styles/Home.module.css'

const Navbar = () => {
    return (
        <>
            <nav className={style.nav}>
                <div className={style.nav_spread_min}>
                    <Link href = '/'>
                        <a>
                            <span className={style.sm_tag}>Zero Gate Wallet</span>
                        </a>
                    </Link>
                    <Link href = '/'>
                        <a>
                            <span className={style.sm_tag}>Kayce Labs</span>
                        </a>
                    </Link>
                    <Link href = '/'>
                        <a>
                            <span className={style.sm_tag}>Kayce DAO</span>
                        </a>
                    </Link>
                </div>
                <div>
                    <Link href = '/'>
                        <a>
                            <Image className={style.Logo} src="/Nav.jpg" width="74px" height="73px"/>
                        </a>
                    </Link>
                </div>
                <div className={style.nav_spread}>
                    <Link href = '/'>
                        <a>
                            <span className={style.main} >Get $KAYCE <Image className={style.Image} src="/Arrow.png" width="10.37px" height="10.27px"/></span>
                            <hr className={style.main_hr}/>
                        </a>
                    </Link>
                    <Link href = '/'>
                        <a>
                            <span className={style.main} >Dashboard <Image className={style.Image} src="/Arrow.png" width="10.37px" height="10.27px"/></span>
                            <hr className={style.main_hr}/>
                        </a>
                    </Link>
                    <Link href = '/'>
                        <a>
                            <span className={style.main} >Launch the DAO <Image className={style.Image} src="/Arrow.png" width="10.37px" height="10.27px"/></span>
                            <hr className={style.main_hr}/>
                        </a>
                    </Link>
                </div>
            </nav>
        </>
    )
}


export default Navbar;
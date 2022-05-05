import Link from 'next/link'
import Image from 'next/image'
import style from '../../styles/Home.module.css'

const Footer = () => {
  return (
    <>
      <footer>
        <div className={style.footer}>
          <div className={style.bg_footer}>
            <div className={style.sm_footer}>
              <div className={style.ls_footer}>
                <div>
                  <h5>Offices</h5>
                  <p>London:</p>
                  <p>One Heddon St, Regent Street,</p>
                  <p>London, W1B 4BD</p>
                </div>
                <div className={style.mid}>
                  <p>Spain:</p>
                  <p>6 Carrer de l’Architecte, </p>
                  <p>18016, Barcelona.</p>
                </div>
              </div>
              <div className={style.link_footer}>
                <Link href="/">
                  <a>
                    <h5>Kayce DAO</h5>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <h5>Imprint</h5>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <h5>Whitepaper</h5>
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <h5>Apply for Funding</h5>
                  </a>
                </Link>
              </div>
            </div>
            <div className={style.sm_footer}>
              <div className={style.ls_footer}>
                <div>
                  <h5>Support</h5>
                  <Link href="/">
                    <a>
                      <p>email@kayce.com</p>
                    </a>
                  </Link>
                </div>
                <div className={style.img_footer}>
                  <Image src="/imagefooter.png" height="121px" width="151px" />
                </div>
              </div>
              <div className={style.bg_link_footer}>
                <Link href="/">
                  <a>
                    <span>
                      Dashboard{' '}
                      <Image
                        className={style.Image}
                        src="/Arrow.png"
                        width="10.37px"
                        height="10.27px"
                      />
                    </span>
                    <hr className={style.footer_hr} />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <span>
                      Get $KAYCE{' '}
                      <Image
                        className={style.Image}
                        src="/Arrow.png"
                        width="10.37px"
                        height="10.27px"
                      />
                    </span>
                    <hr className={style.footer_hr} />
                  </a>
                </Link>
                <Link href="/">
                  <a>
                    <span>
                      Launch the DAO{' '}
                      <Image
                        className={style.Image}
                        src="/Arrow.png"
                        width="10.37px"
                        height="10.27px"
                      />
                    </span>
                    <hr className={style.footer_hr} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.final_footer}>
            <p>© 2022 Kayce. All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer

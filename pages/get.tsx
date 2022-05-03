import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.css'

const Get: NextPage = () => {
  return (
    <div>
      <div className={style.main_blue}>
        <span className={style.nav_blue}>
          <nav className={style.nav}>
            <div className={style.nav_spread_min}>
              <Link href="/">
                <a>
                  <span className={style.sm_tag}>Zero Gate Wallet</span>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <span className={style.sm_tag}>Kayce Labs</span>
                </a>
              </Link>
              <Link href="/">
                <a>
                  <span className={style.sm_tag}>Kayce DAO</span>
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a>
                  <Image
                    className={style.Logo}
                    src="/Framew.jpg"
                    width="74px"
                    height="73px"
                  />
                </a>
              </Link>
            </div>
            <div className={style.nav_spread}>
              <Link href="/">
                <a>
                  <span className={style.main}>
                    Get $KAYCE{' '}
                    <Image
                      className={style.Image}
                      src="/Arrowwhite.png"
                      width="10.37px"
                      height="10.27px"
                    />
                  </span>
                  <hr className={style.main_hr} />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <span className={style.main}>
                    Dashboard{' '}
                    <Image
                      className={style.Image}
                      src="/Arrowwhite.png"
                      width="10.37px"
                      height="10.27px"
                    />
                  </span>
                  <hr className={style.main_hr} />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <span className={style.main}>
                    Launch the DAO{' '}
                    <Image
                      className={style.Image}
                      src="/Arrowwhite.png"
                      width="10.37px"
                      height="10.27px"
                    />
                  </span>
                  <hr className={style.main_hr} />
                </a>
              </Link>
            </div>
          </nav>
        </span>
      </div>
      <div className={style.header_ctr}>
        <header className={style.header1}>
          <div className={style.header_bg}>
            <h1>Kayce Token Sale is almost here!</h1>
            <p>
              The governance token of the Kayce DAO:{' '}
              <span className={style.edit}>$KAYCE </span>
              would be ready for buying and selling very soon.
            </p>
            <div className={style.main_link}>
              <Link href="/">
                <a className={style.link}>
                  <span>Token sale information</span>
                  <hr className={style.sec_hr} />
                </a>
              </Link>
              <Link href="/">
                <a className={style.link}>
                  <span>Join the community</span>
                  <hr className={style.sec_hr} />
                </a>
              </Link>
            </div>
          </div>
        </header>
      </div>
      <div className={style.Founding_img1}>
        <Image src="/Groupble.png" height="91.69px" width="1450px" />
      </div>
      <div>
        <section className={style.conatiner_sectionbg}>
          <div className={style.conatiner_section}>
            <div className={style.section_head}>
              <h2>PURPOSE</h2>
              <h1>
                To open the doors for energy tech innovation in emerging markets
              </h1>
            </div>
            <div className={style.h_divbg}></div>
            <div className={style.sm_container_sectionbg}>
              <p>
                Kayce is a DAO ths removes the risk for energy tecch investment
                in emerging markets. This is accomplished through providing
                financing services and research. Our platform is designed to be
                a self-sustaining public utility. A digital comonns available
                without the possibility of censorship.
              </p>
              <p>
                <span className={style.edit}>
                  We think of it as the infrastructure for the ennrgy transition
                  in emerging markets.{' '}
                </span>
                However, infrastructure requires upkeep; ongoing development,
                maintenance, and support will be needed to ship our ambitious
                roadmap and grow a thriving ecosystem. Funds from token sale of
                $KAYCE,, the Kayce DAO’s native token are entirely for the DAO
                to realize that mission.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className={style.big_news_sectionbg}>
        <section className={style.big_news_section}>
          <h1 className={style.big_news_section_h1}>TOKEN</h1>
          <h2>KAYCE is required for:</h2>
          <div className={style.parent_div}>
            <div className={style.sm_news_section}>
              <div className={style.new_sectionbg}>
                <h1>Governance Staking</h1>
                <p>
                  Disputes in the DAO require KAYCE to be ‘staked’ as surety.
                  Winning a dispute earns stakers a share of the loser’s KAYCE.
                </p>
              </div>
              <div className={style.news_section_ctr}>
                <h1>Revenue Sharing</h1>
                <p>
                  Accounts with both KAYCE & Reputation in the Metacolony may be
                  eligible to claim a share of Metacolony revenue.
                </p>
              </div>
              <div className={style.news_section_ctr}>
                <h1>Reputation Mining</h1>
                <p>
                  Reputation updates are calculated off-chain by miners who
                  stake KAYCE to compete to perform them to earn KAYCE and
                  Reputation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className={style.mania_footer}>
        <section className={style.changing_world}>
          <div>
            <h1>Be a part of changing the world</h1>
            <p>
              Keep energy researches afloat with us as we build a future for
              context-based energy in emerging markets
            </p>
            <div className={style.changing_world_img}>
              <div>
                <Image src="/whiteDs.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteTL.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteMD.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteYT.png" height="46px" width="44px" />
              </div>
              <div>
                <Image src="/whiteTW.png" height="46px" width="44px" />
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer>
        <div className={style.blue_footer}>
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
                  <Image src="/bglogo.png" height="121px" width="151px" />
                </div>
              </div>
              <div className={style.bg_link_footer}>
                <Link href="/">
                  <a>
                    <span>
                      Dashboard{' '}
                      <Image
                        className={style.Image}
                        src="/Arrowwhite.png"
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
                        src="/Arrowwhite.png"
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
                        src="/Arrowwhite.png"
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
    </div>
  )
}

export default Get

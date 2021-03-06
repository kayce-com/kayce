import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import style from '../styles/Home.module.css'
import Navbar from '../components/external/Navbar'
import Footer from '../components/external/Footer'

const Imprint: NextPage = () => {
  return (
    <div className={style.imprint}>
      <Navbar />
      <header className={style.main_funding_container}>
        <h1>Terms of Use & Privacy Policy</h1>
        <p>
          Small talk to just give legal kini and all of dat. Lorem Sed ut
          perspiciatis, unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo
          inventore veritatis et quasi architecto beatae vitae dicta sunt,
          explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur
          aut odit aut fugit, sed quia consequuntur magni dolores eos, qui
          ratione voluptatem sequi nesciunt, neque porro quisquam est, qui
          dolorem ipsum,
        </p>
        <div className={style.linkt}>
          <Link href="/">
            <a>
              <span> Apply to the Kayce DAO</span>
              <hr className={style.sec_hrt} />
            </a>
          </Link>
        </div>
      </header>
      <div className={style.Founding_img}>
        <Image src="/Group054.png" height="91.69px" width="1450px" />
      </div>
      <section className={style.bg_across_container}>
        <div className={style.sm_across}>
          <h1>Terms of Use</h1>
          <Image src="/Group156.png" height="732.85px" width="393px" />
        </div>
        <div className={style.sm_across_container}>
          <h3>ABOUT US</h3>
          <h2>
            The Kayce DAO ecosystem is community-governed, decentralized, and
            circular by design.
          </h2>
          <p>
            Members of the public can join VitaDAO and govern its IP through
            VITA tokens by contributing funds, work, or valuable research data
            or IP assets. VITA tokens enable their holder to engage in
            decision-making and governance of VitaDAO???s research, signal support
            for specific initiatives, and govern its data repositories and IP
            portfolio.
          </p>
          <hr />
          <h3>AGREEMENT</h3>
          <p>
            VitaDAO will acquire and commission research, as well as own,
            develop and monetize the resulting intellectual property assets. Our
            portfolio consists of:
          </p>
          <p>
            1. NFTs representing intellectual property, patents and licenses to
            therapeutic research projects.
          </p>
          <p>
            2. Data assets generated by funding R&D around its research projects
            and NFTs.
          </p>
          <p>
            To fund more research and to provide long term funding for the DAO
            operations, there are several options to monetize owned data and IP
          </p>
          <hr />
          <h3>ACCEPTABLE USE POLICY</h3>
          <p>
            Vetted longevity research projects will request funds from VitaDAO,
            and members will vote to grant or raise those funds in exchange for
            ownership in the resulting IP.
          </p>
          <p>
            VitaDAO can enter co-development deals with private companies or
            other DAOs. In single or multi-license agreements, VitaDAO could
            license data and IP to 3rd parties, or could sell to the highest
            suitable bidder. One route of IP monetisation would be data
            marketplaces, where VitaDAO can securely publish selected parts of
            the research data or findings.
          </p>
        </div>
      </section>
      <section className={style.bg_container_ready_imprint_main}>
        <div className={style.bg_container_ready_imprint}>
          <div className={style.container_ready}>
            <div className={style.container_ready_hr}>
              <h1>Ready to make a move?</h1>
              <p>
                Get in touch with us to see how Korapay can help you scale your
                business. Our customer success teams are always available to
                walk you through getting started.
              </p>
            </div>
            <div className={style.ready_link}>
              <span className={style.ready_link_span}>
                <Link href="/">
                  <a>
                    <span className={style.a_link}>Contact Us</span>
                    <hr className={style.main_hr} />
                  </a>
                </Link>
              </span>
            </div>
            <div className={style.ready_link}>
              <Link href="/">
                <a>
                  <span className={style.main}>
                    Apply for Funding
                    <Image
                      className={style.Image}
                      src="/Arrowwhite.png"
                      width="14.87px"
                      height="14.87px"
                    />
                  </span>
                  <hr className={style.main_hr1} />
                </a>
              </Link>
            </div>
          </div>
        </div>
        <span className={style.bg_across_container_policy}>
          <section className={style.bg_across_container}>
            <div className={style.sm_across}>
              <h1>Privacy Policy</h1>
              <Image src="/Group160.png" height="732.85px" width="393px" />
            </div>
            <div className={style.sm_across_container}>
              <h3>ABOUT US</h3>
              <h2>
                The Kayce DAO ecosystem is community-governed, decentralized,
                and circular by design.
              </h2>
              <p>
                Members of the public can join VitaDAO and govern its IP through
                VITA tokens by contributing funds, work, or valuable research
                data or IP assets. VITA tokens enable their holder to engage in
                decision-making and governance of VitaDAO???s research, signal
                support for specific initiatives, and govern its data
                repositories and IP portfolio.
              </p>
              <hr />
              <h3>AGREEMENT</h3>
              <p>
                VitaDAO will acquire and commission research, as well as own,
                develop and monetize the resulting intellectual property assets.
                Our portfolio consists of:
              </p>
              <p>
                1. NFTs representing intellectual property, patents and licenses
                to therapeutic research projects.
              </p>
              <p>
                2. Data assets generated by funding R&D around its research
                projects and NFTs.
              </p>
              <p>
                To fund more research and to provide long term funding for the
                DAO operations, there are several options to monetize owned data
                and IP
              </p>
              <hr />
              <h3>ACCEPTABLE USE POLICY</h3>
              <p>
                Vetted longevity research projects will request funds from
                VitaDAO, and members will vote to grant or raise those funds in
                exchange for ownership in the resulting IP.
              </p>
              <p>
                VitaDAO can enter co-development deals with private companies or
                other DAOs. In single or multi-license agreements, VitaDAO could
                license data and IP to 3rd parties, or could sell to the highest
                suitable bidder. One route of IP monetisation would be data
                marketplaces, where VitaDAO can securely publish selected parts
                of the research data or findings.
              </p>
            </div>
          </section>
        </span>
      </section>
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
                  <p>6 Carrer de l???Architecte, </p>
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
            <p>?? 2022 Kayce. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Imprint

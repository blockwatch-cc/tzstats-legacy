import React from 'react';

const PrivacyPage = () => {
  React.useEffect(() => {
    document.title = 'Privacy Policy';
  }, []);

  return (
    <div className="result">
      <h1>TzStats Privacy Policy</h1>
      <p>
        <em>last revised: July 28, 2019</em>
      </p>
      <h3>1 What Information We Collect From You</h3>
      <p>
        TzStats is a public information website (the Site) displaying publicly available Tezos blockchain data and
        aggregate statistics (collectively the Services). We do not support user signup or personalization of the site
        that requires us to store and process Your data in a central database on our backends. All personalized data
        like display currency and time-frame selections are exclusively stored in your web browser's local storage.
      </p>
      <p>
        We do, however, collect and/or receive anonymized data about Your use of our site for the sole purpose of
        understanding and optimizing Your user experience and for finding bugs and performance issues. This includes
        information from the following categories:
      </p>
      <ul>
        <li>
          <p>
            <strong>From Your Activity.</strong> In an ongoing effort to improve the Site, and the Services we
            automatically collect certain information when You visit the Site and access the Services. This information
            consists of IP addresses, browser type and language, referring and exit pages and URLs, date and time,
            amount of time spent on particular pages, what sections of the Sites You visit, and similar information
            concerning Your use of the Site and the Services.
          </p>
        </li>
        <li>
          <p>
            <strong>From Cookies.</strong> We also collect information by using “cookie” (more specifically ”local
            storage”) technology. Cookies are small packets of data that a website stores on the hard drive of your
            computer or mobile device to “remember” information about your visit. We use persistent cookies (which stay
            on your computer/device until you delete them) to store Your preferences. If you do not want us to place a
            cookie on your hard drive, you may be able to turn that feature off on your computer or mobile device.
            Please consult your Internet browser’s documentation for information on how to do this and how to delete
            persistent cookies. However, if you decide not to accept cookies from us, the Site, and/or the Services may
            not function properly.
          </p>
        </li>
        <li>
          <p>
            <strong>Third-Party Analytics.</strong> We use one or more third–party analytics services (such as Google
            Analytics and Mixpanel) to evaluate your use of the Site, and the Services, compile reports on activity
            (based on their collection of IP addresses, Internet service provider, browser type, operating system and
            language, referring and exit pages and URLs, data and time, amount of time spent on particular pages, what
            sections of the Sites you visit, number of links clicked while on the Sites, search terms and other similar
            usage data), and analyze performance metrics. These third parties use cookies and other technologies to help
            analyze and provide us the data. By visiting the Site, and accessing and using the Services, you consent to
            the processing of data about you by these analytics providers in the manner and for the purposes set out in
            this Privacy Policy. For more information on these third parties, including how to opt out from certain data
            collection, please visit the sites below. Analytics services are optional, if you decide not to accept such
            cookies and/or tracking, your experience using our Site's will not be affected.
          </p>
        </li>
        <li>
          <strong>Aggregate Data.</strong> In an ongoing effort to better understand Your needs and use of our Site and
          Services, we analyze your information in aggregate form in order to operate, maintain, manage, and improve the
          Site, and the Services. This aggregate information does not identify you personally. We share this aggregate
          data with our affiliates, agents, and business partners. We may also disclose aggregated user statistics in
          order to describe our products and services to current and prospective business partners and to other third
          parties for other lawful purposes. In addition, we provide aggregated statistical collective user information,
          to our partners so that they understand how often people use specific components of our Services.
        </li>
      </ul>
      <p>
        For Google Analytics, please visit:{' '}
        <a href="https://www.google.com/analytics">https://www.google.com/analytics</a>
      </p>
      <p>
        For Mixpanel, please visit: <a href="https://mixpanel.com">https://mixpanel.com</a>
      </p>
      <h3>2 How Your Information is Protected</h3>
      <p>
        All Internet communication with the TzStats Site is end-to-end encrypted using state-of-the-art technology like
        TLS. Keep in mind that other forms of Internet communication, including email sent to and from us, may be stored
        and forwarded unencrypted. You should therefore take special care in deciding what information You send to us
        via e-mail or other electronic means.
      </p>
      <h3>3 How Long Your Information is Retained</h3>
      <p>
        Site activity and analytics data, including analytics data collected by third parties who function as our data
        processing agents, is retained for 180 days and automatically deleted after this time period.
      </p>
      <h3>4 What Choices are Available to You on Our Services</h3>
      <p>You can at any time choose to limit the amount of information we share with third parties.</p>
      <p>
        <strong>Analytics collection is optional.</strong> If you choose not to disclose your activity on the Site, you
        can opt out of analytics collection altogether by enabling the do-no-track option in your web browser or by
        blocking 3rd part scripts using a script blocker. We strongly encourage you to use open-source script blockers
        like uBlock Origin because they generally improve your overall security when browsing the Internet.
      </p>
      <h3>5 International Users and Applicable Law</h3>
      <p>
        Please note that activity and analytics information from using our Site will be transferred to the United States
        of America, the European Union and other countries so as to provide this Site and our data products to You. If
        you are not a US or EU resident, you acknowledge and agree that we collect, process, use and store your
        information, as discussed in this Privacy Policy, outside your resident jurisdiction, including in the European
        Union and the United States. Please be aware that EU law, US law and laws of other countries where we may store
        and process your data offer different levels of protection for personal information than what may be available
        in your country.
      </p>
      <p>
        EU users have the right to access, rectify or delete any personal information that we hold under GDPR data
        protection legislation. You also have the right to portability and to object to the use of your personal
        information. If you wish to exercise any of these rights, please send an email to&nbsp;
        <a href="mailto:info@tzstats.com">info@tzstats.com</a>.
      </p>
      <h3>6 Updates to This Policy</h3>
      <p>
        We may update this Privacy Policy to reflect changes to our information practices. If we change our Privacy
        Policy, we will post those changes to this Privacy Policy and change the "last revised" date above. If we make
        any material changes, notice of the changes will be posted along with the revised Privacy Policy. We encourage
        you to periodically review this page for the latest information on our privacy practices.
      </p>
      <h3>8 Contact Us</h3>
      <p>
        If you have questions or concerns regarding your privacy or security on our Site, feel free to contact us
        at&nbsp;<a href="mailto:info@tzstats.com">info@tzstats.com</a>.
      </p>
    </div>
  );
};
export default PrivacyPage;

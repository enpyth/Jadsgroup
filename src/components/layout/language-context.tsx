"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "cn"

type Translations = {
  [key: string]: {
    en: string
    cn: string
  }
}

// Define translations
const translations: Translations = {
  home: { en: "Home", cn: "首页" },
  aboutUs: { en: "About Us", cn: "关于我们" },
  property: { en: "Property", cn: "房产" },
  technology: { en: "Technology", cn: "技术" },
  export: { en: "Export", cn: "出口" },
  marketPlaza: { en: "Market Plaza", cn: "市场广场" },
  events: { en: "Events", cn: "活动" },
  contactUs: { en: "Contact Us", cn: "联系我们" },
  ourActivities: { en: "Our Activities", cn: "我们的活动" },
  strataManagement: { en: "Strata Management", cn: "分层管理" },
  learnMore: { en: "Learn More", cn: "了解更多" },
  companyIntro: {
    en: "Established in 1996, JADS Group is a proud family-owned business with a diverse range of products and services that reflects our commitment to innovation and changing market trends. Our multilingual and professional staff aim for to provide a one-stop customised solution to investors and new arrivals.",
    cn: "JADS集团成立于1996年，是一家自豪的家族企业，提供多样化的产品和服务，反映了我们对创新和不断变化的市场趋势的承诺。我们多语言和专业的员工旨在为投资者和新到者提供一站式定制解决方案。",
  },
  propertyDesc: {
    en: "Specialist in strata management as well as residential and commercial property. We also project manage different types of investment strategy for the discerning investors.",
    cn: "专门从事分层管理以及住宅和商业地产。我们还为有眼光的投资者项目管理不同类型的投资策略。",
  },
  technologyDesc: {
    en: "Seamless renewable photovoltaic solutions powered by AI and IoT technology that can complement with the conventional grid system.",
    cn: "由人工智能和物联网技术支持的无缝可再生光伏解决方案，可以与传统电网系统互补。",
  },
  exportDesc: {
    en: "Foster bilateral trade of perishables direct from the growers and small manufacturers between Australia and South East Asia.",
    cn: "促进澳大利亚和东南亚之间直接从种植者和小型制造商那里获取易腐商品的双边贸易。",
  },
  marketPlazaDesc: {
    en: "We manage Market Plaza a shopping centre situated in the heart of Adelaide CBD product. It is adjacent and in association with Adelaide Central Market (dating back to 1869).",
    cn: "我们管理市场广场，这是一个位于阿德莱德CBD产品中心的购物中心。它毗邻并与阿德莱德中央市场（可追溯到1869年）相关联。",
  },
  more: { en: "More", cn: "更多" },
  partnerTitle: { en: "Partner with our trusted agents", cn: "与我们值得信赖的代理合作" },
  partnerDesc1: {
    en: "Our sales and leasing partners can help you find the appropriate property and/or product.",
    cn: "我们的销售和租赁合作伙伴可以帮助您找到合适的房产和/或产品。",
  },
  partnerDesc2: {
    en: "Our innovative range of products and services reflects our dedication to improvement, and we're always eager to change to market trends and customer preferences.",
    cn: "我们创新的产品和服务范围反映了我们对改进的奉献精神，我们始终渴望根据市场趋势和客户偏好进行变革。",
  },
  findAgent: { en: "Find an agent", cn: "寻找代理" },
  contactTitle: { en: "We would love to hear from you", cn: "我们很乐意听取您的意见" },
  callUs: { en: "Call us on 08 8212 8866", cn: "致电我们：08 8212 8866" },
  agentsHelp: {
    en: "Our team of agents are here to guide and help you on your journey",
    cn: "我们的代理团队在此指导并帮助您的旅程",
  },
  sales: { en: "Sales", cn: "销售" },
  leasing: { en: "Leasing", cn: "租赁" },
  generalEnquiry: { en: "General Enquiry", cn: "一般咨询" },
  namePlaceholder: { en: "Name(required)", cn: "姓名(必填)" },
  mobilePlaceholder: { en: "Mobile(required)", cn: "手机(必填)" },
  emailPlaceholder: { en: "Email(required)", cn: "电子邮件(必填)" },
  addressPlaceholder: { en: "Address", cn: "地址" },
  microGrid: { en: "Micro grid system", cn: "微电网系统" },
  powerPurchase: { en: "Power Purchase Agreement", cn: "电力购买协议" },
  freshGrowers: { en: "Fresh from the growers", cn: "直接来自种植者" },
  properties: { en: "Properties", cn: "房产" },
  messagePlaceholder: { en: "Write your message...", cn: "写下您的留言..." },
  verificationCode: { en: "Verification code", cn: "验证码" },
  sendEnquiry: { en: "Send Enquiry", cn: "发送咨询" },
  quickLinks: { en: "Quick Links", cn: "快速链接" },
  services: { en: "Services", cn: "服务" },
  contactInfo: { en: "Contact Info", cn: "联系信息" },
  projectManagement: { en: "Project Management", cn: "项目管理" },
  propertyManagement: { en: "Property Management", cn: "物业管理" },
  termsConditions: { en: "Terms & Conditions", cn: "条款和条件" },
  termsOfUse: { en: "Terms of Use", cn: "使用条款" },
  copyright: { en: "Copyright @2023 JADS Group", cn: "版权所有 @2023 JADS集团" },
  signIn: { en: "Sign In", cn: "登录" },
  // About page translations
  aboutCompany: { en: "Our Company", cn: "我们的公司" },
  companyHistory1: {
    en: "Established in 1998, JADS Group is a proud family-owned business. We understand the importance of trust, integrity, and a strong work ethic. These values are ingrained in every aspect of our operations, from product development to customer interactions.",
    cn: "JADS集团成立于1998年，是一家自豪的家族企业。我们理解信任、诚信和强大的职业道德的重要性。这些价值观融入了我们运营的各个方面，从产品开发到客户互动。",
  },
  companyHistory2: {
    en: "In an ever-evolving business landscape, We have demonstrated adaptability and a forward-thinking mindset. We have embraced new technologies, refined our processes, and diversified our offerings to stay relevant and continue our upward trajectory.",
    cn: "在不断变化的商业环境中，我们展现了适应能力和前瞻性思维。我们拥抱新技术，改进流程，并多样化产品，以保持相关性并继续保持上升轨迹。",
  },
  companyHistory3: {
    en: "As we celebrate our journey since 1998, we remain focused on the future. We are excited about the opportunities ahead and are committed to further innovation, growth, and serving our community with the same passion and dedication that has defined JADS Group for over two decades.",
    cn: "在庆祝 1998 年以来的历程的同时，我们仍着眼于未来。我们对未来的机遇感到兴奋，并致力于进一步创新、发展，并以 JADS 集团二十多年来所秉持的热情和奉献精神服务于我们的社区。",
  },
  davidWongBio: {
    en: "David Wong is a popular elder in the local Asian community in South Australia. He was a Councillor of Adelaide City Council and serves on the Catholic Church board. David Wong started as a civil servant for Malaysian Government in Sarawak and after leaving the civil service in 1981 he went into active business as a procurement agent supplying timber and building materials for a construction company in Bintulu while also working as agent for a shipping company and manager of a travel agency based in Kuching. With his accumulated profit made over a short period of time his business was subsequently extended to Brunei in 1985 when he joined force with a civil engineering firm from Sarawak and a prominent local identity.",
    cn: "David Wong是南澳大利亚当地亚洲社区的知名长者。他曾是阿德莱德市议会的议员，并在天主教教会董事会任职。David Wong最初是马来西亚政府在砂拉越的公务员，1981年离开公职后，他积极从事商业活动，担任采购代理，为民都鲁的一家建筑公司供应木材和建筑材料，同时也为一家航运公司担任代理，并管理位于古晋的旅行社。凭借短时间内积累的利润，他的业务随后于1985年扩展到文莱，当时他与来自砂拉越的一家土木工程公司和一位当地知名人士合作。",
  },
  graceWongBio: {
    en: "Grace Wong retired from teaching in the remote settlements in the jungles of Sarawak (Malaysia) after migrating to Australia with her family. She discovered her passion in hospitality after arriving in Australia. She invested in a motel boasting 60 rooms sitting on a large country estate that encompassed tennis courts, a swimming pool and a function center for weddings. She sold her interest after 12 years managing the operations of the motel with her partner to downsize to a quaint breakfast and lunch café in Adelaide. After 3 years of running the café Grace decided to retire for good to support the pursuits of her husband and children.",
    cn: "Grace Wong在与家人移民澳大利亚后，从砂拉越（马来西亚）丛林中的偏远定居点的教学工作中退休。她在抵达澳大利亚后发现了自己对酒店业的热情。她投资了一家拥有60个房间的汽车旅馆，坐落在一个大型乡村庄园上，包括网球场、游泳池和婚礼功能中心。在与合伙人一起管理汽车旅馆运营12年后，她卖掉了自己的权益，缩小规模到阿德莱德的一家古色古香的早餐和午餐咖啡馆。经营咖啡馆3年后，Grace决定彻底退休，以支持她丈夫和孩子们的追求。",
  },
  andyWongBio: {
    en: "Andy Wong has an associate diploma in civil engineering and a degree in Communication with a minor in computer science and helps in the property management side of the family business. His ambition is to introduce technology and streamline some business processes online. Andy also had Living Adventure, a travel agency established in 1981 that specialises in tailor made itineraries to 'off the beaten tracks' mainly on the continent of South America, Africa and Antarctica for individuals and small groups up to the Covid19 pandemic.",
    cn: "Andy Wong拥有土木工程副学士学位和通信学位，辅修计算机科学，并在家族企业的物业管理方面提供帮助。他的抱负是引入技术并简化一些在线业务流程。Andy还拥有Living Adventure，这是一家成立于1981年的旅行社，专门为个人和小团体提供定制的'非常规路线'行程，主要在南美洲、非洲和南极洲大陆，直到Covid19疫情爆发。",
  },
  ShirleyBio: {
    en: "Shirley plays a crucial role in ensuring the smooth functioning of the office by handling administrative tasks such as organizing schedules, managing tenants' enquiries and track rental payments. She also reports the financials for various properties; expenses, assets, and liabilities, provide insights that help the business owners make informed decisions.",
    cn: "Shirley 负责处理行政事务，例如安排日程、管理租户查询和跟踪租金支付，在确保办公室顺利运作方面发挥着至关重要的作用。她还报告各种物业的财务状况；费用、资产和负债，提供见解，帮助企业主做出明智的决策。"
  },
  // Tech titles
  tech_title_microgrid: { en: "Microgrid", cn: "微电网" },
  tech_title_commercial: { en: "Solar Commercial", cn: "商业太阳能" },
  tech_title_residential: { en: "Solar Residential", cn: "住宅太阳能" },

  // Tech descriptions
  tech_desc_microgrid: {
    en: "Localised energy system that can operate independently or in conjunction with conventionnal electrical grid",
    cn: "可独立运行或与传统电网配合的本地化能源系统"
  },
  tech_desc_commercial: {
    en: "To develop and finance alternative energy procurement strategr that is right for your business",
    cn: "为您的企业开发和融资合适的替代能源采购策略"
  },
  tech_desc_residential: {
    en: "Reduce energy consumption from conventional grid and reduce the const of energy",
    cn: "减少传统电网能源消耗并降低能源成本"
  },
  tech_p1_1: {
    en: "A Micro-grid is a local energy grid with control capability, which means it can disconnect from the traditional grid and operate autonomously. The grid connects homes, businesses and other buildings to central power sources, which allow users to use electronics.",
    cn: ""
  },
  tech_p1_2: {
    en: "A Micro-grid generally operates while connected to the grid, but importantly, it can break off and operate on its own using local energy generation in times of crisis like storms or power outages, or for other reasons.",
    cn: ""
  },
  tech_p1_3: {
    en: "A Micro-grid can be powered by distributed generators, batteries, and/or renewable resources like solar panels. Depending on how it’s fuelled and how its requirements are managed, a micro-grid might run indefinitely.",
    cn: ""
  },
  tech_p1_4: {
    en: "A Micro-grid connects to the grid at a point of common coupling that maintains voltage at the same level as the main grid unless there is some sort of problem on the grid or other reason to disconnect. A switch can separate the Micro-grid from the main grid automatically or manually, and it then functions as an island.",
    cn: ""
  },
  tech_p1_5: {
    en: "In general, Micro-grids have made it possible for power generator to provide power to users directly. The Micro-grid has greatly weakened the role of electric grids and intermediaries, thereby providing investors with more lucrative returns.",
    cn: ""
  },
  tech_carousel_m1_1: {
    en: "Appropriate: islands, mountains, remote areas where the grid cannot reach",
    cn: ""
  },
  tech_carousel_m1_2: {
    en: "Form: Build Photovoltaic power stations (or joint wind power stations), power storage stations and supplemented diesel generator sets in non-grid areas.",
    cn: ""
  },
  tech_carousel_m1_3: {
    en: "Charges: It requires minimum electricity usage, PPA, and charges a maintenance fee.",
    cn: ""
  },
  tech_carousel_m2_1: {
    en: "Appropriate: New houses, new community, and towns with accessible grid connections",
    cn: ""
  },
  tech_carousel_m2_2: {
    en: "Form: The solar energy is made on the roof, and the energy storage box is built in the house. Each house serves as a complement between the user and the power station and is complemented by a unified network",
    cn: ""
  },
  tech_carousel_m2_3: {
    en: "Charges: Discounts on normal electricity prices and charges a fixed maintenance fees",
    cn: ""
  },
  tech_carousel_m3_1: {
    en: "Appropriate: apartment buildings, hotels, office buildings, and group users.",
    cn: ""
  },
  tech_carousel_m3_2: {
    en: "Form: Set up energy storage power station and system on the site of photovoltaic power station far away from the urban areas, integrate the network point at the user end, remote power supply, supplemented by the external grid",
    cn: ""
  },
  tech_carousel_m3_3: {
    en: "Charges: Discounts on normal electricity prices and an additional access fees may charges",
    cn: ""
  }



}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language]
    }
    return key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}


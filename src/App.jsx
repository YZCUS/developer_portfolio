import React, { useState } from 'react';
import { Layout, Menu, Avatar, Row, Col, Typography, Button, Space, Divider, Timeline, Drawer, Grid } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  MenuOutlined,
  UserOutlined,
  CodeOutlined,
  TrophyOutlined,
  ProjectOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import SkillCard from './components/SkillCard.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import { personalInfo, skills, projects, experience, menuItems } from './data/data.js';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;
  // Create icon components from string names
  const iconMap = {
    UserOutlined: <UserOutlined />,
    CodeOutlined: <CodeOutlined />,
    TrophyOutlined: <TrophyOutlined />,
    ProjectOutlined: <ProjectOutlined />,
    ContactsOutlined: <ContactsOutlined />
  };

  // Convert menu items to include actual icon components
  const processedMenuItems = menuItems.map(item => ({
    ...item,
    icon: iconMap[item.icon]
  }));

  // Derive initials for brand logo
  const initials = personalInfo.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const scrollToSection = (elementId) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMenuClick = (e) => {
    scrollToSection(e.key);
  };

  return (
    <Layout className="layout">
      {/* Header */}
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <a
            href="#"
            className="brand"
            aria-label="Go to About section"
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            <div className="brand-logo" aria-hidden="true">{initials}</div>
            <div className="brand-title">{personalInfo.name}</div>
          </a>
          {isMobile ? (
            <Button
              type="text"
              aria-label="Open navigation menu"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setIsDrawerOpen(true)}
            />
          ) : (
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['about']}
              items={processedMenuItems}
              onClick={handleMenuClick}
              style={{ border: 'none', flex: 1, justifyContent: 'center' }}
            />
          )}
        </div>
      </Header>

      {/* Mobile navigation drawer */}
      <Drawer
        placement="right"
        width={280}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          items={processedMenuItems}
          onClick={(e) => { handleMenuClick(e); setIsDrawerOpen(false); }}
          style={{ border: 'none' }}
        />
      </Drawer>

      <Content style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', marginTop: 64 }}>
        {/* Hero Section */}
        <div id="about" className="hero-section" style={{
          padding: '120px 0',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          margin: '0 -24px',
          marginBottom: '80px'
        }}>
          <Row justify="center" align="middle">
            <Col xs={24} md={16} lg={12} className="hero-content">
              <Avatar
                size={screens.md ? 220 : 140}
                src={personalInfo.avatar}
                alt={`${personalInfo.name} avatar`}
                style={{ marginBottom: 24 }}
              />
              <Title style={{ color: 'white', marginBottom: 8, fontSize: '2.5rem' }}>{personalInfo.name}</Title>
              <Title level={3} style={{ color: 'white', fontWeight: 300, marginBottom: 24 }}>{personalInfo.title}</Title>
              <Paragraph style={{ color: 'white', fontSize: 18, maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.6 }}>
                {personalInfo.bio.title} {personalInfo.bio.subtitle}
              </Paragraph>
              <Space size="large">
                <Button type="primary" size="large" onClick={() => scrollToSection('projects')}>
                  View My Projects
                </Button>
                <Button size="large" style={{ background: 'transparent', borderColor: 'white', color: 'white' }} onClick={() => scrollToSection('contact')}>
                  Get In Touch
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {/* Skills Section */}
        <div id="skills" style={{ marginBottom: '120px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>Technical Skills</Title>
          <Row gutter={[32, 32]} justify="center">
            {skills.map((skill, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <SkillCard skill={skill} index={index} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Experience Section */}
        <div id="experience" style={{
          marginBottom: '120px',
          background: '#fafafa',
          margin: '0 -24px 120px -24px',
          padding: '80px 24px'
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>Education & Experience</Title>
          <Row justify="center">
            <Col xs={24} lg={16}>
              <Timeline mode="left">
                {experience.map((exp, index) => (
                  <Timeline.Item key={index} label={exp.period}>
                    <div style={{
                      background: 'white',
                      padding: '32px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                      border: '1px solid #f0f0f0',
                      transition: 'all 0.3s ease',
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                      }}
                    >
                      <Title level={4} style={{ marginBottom: 8 }}>{exp.title}</Title>
                      <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>{exp.company}</Text>
                      <Paragraph style={{ marginTop: 16, fontSize: '15px', lineHeight: 1.6 }}>{exp.description}</Paragraph>
                      {Array.isArray(exp.highlights) && exp.highlights.length > 0 && (
                        <ul className="experience-highlights">
                          {exp.highlights.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Col>
          </Row>
        </div>

        {/* Projects Section */}
        <div id="projects" style={{ marginBottom: '120px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60 }}>Featured Projects</Title>
          <Row gutter={[32, 32]}>
            {projects.map((project, index) => (
              <Col xs={24} md={12} lg={8} key={index}>
                <ProjectCard project={project} index={index} />
              </Col>
            ))}
          </Row>
        </div>

        {/* Contact Section */}
        <div id="contact" style={{
          background: 'linear-gradient(135deg, #001529 0%, #002140 100%)',
          color: 'white',
          margin: '0 -24px',
          padding: '80px 24px',
          marginBottom: '0'
        }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: 60, color: 'white' }}>Let's Connect</Title>
          <Row justify="center">
            <Col xs={24} md={16} lg={12} style={{ textAlign: 'center' }}>
              <Paragraph style={{ color: 'white', fontSize: 18, marginBottom: 48, lineHeight: 1.6 }}>
                {personalInfo.contactMessage}
              </Paragraph>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Space size="middle">
                  <MailOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                  <Text style={{ color: 'white', fontSize: 16 }}>{personalInfo.email}</Text>
                </Space>
                <Space size="middle">
                  <Text style={{ color: 'white', fontSize: 16 }}>📍 {personalInfo.location}</Text>
                </Space>
                <Divider style={{ borderColor: '#434343', margin: '32px 0' }} />
                <Space size="large">
                  <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<GithubOutlined />}
                    href={personalInfo.github}
                    target="_blank"
                    className="social-button"
                    rel="noopener noreferrer"
                    aria-label="Open GitHub profile"
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<LinkedinOutlined />}
                    href={personalInfo.linkedin}
                    target="_blank"
                    className="social-button"
                    rel="noopener noreferrer"
                    aria-label="Open LinkedIn profile"
                  />
                  <Button
                    type="primary"
                    shape="circle"
                    size="large"
                    icon={<MailOutlined />}
                    href={`mailto:${personalInfo.email}`}
                    className="social-button"
                    aria-label="Send email"
                  />
                </Space>
              </Space>
            </Col>
          </Row>
        </div>
      </Content>

      <Footer style={{ textAlign: 'center', background: 'linear-gradient(135deg, #001529 0%, #000d1a 100%)', color: 'white', padding: '24px 0' }}>
        <Text style={{ color: 'white' }}>
          {personalInfo.footer}
        </Text>
      </Footer>
    </Layout>
  );
}

export default App;

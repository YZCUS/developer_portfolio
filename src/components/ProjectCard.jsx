import React, { useState } from 'react';
import { Card, Tag, Button, Typography, Divider } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Generate gradient colors for project covers
    const gradients = [
        ['#ff6b6b', '#ffa726'],
        ['#4ecdc4', '#26c6da'],
        ['#45b7d1', '#ab47bc'],
        ['#96c93d', '#00acc1'],
        ['#fd9644', '#fe5196'],
        ['#a8e6cf', '#dcedc8']
    ];

    const gradient = gradients[index % gradients.length];

    return (
        <Card
            hoverable
            style={{
                height: '100%',
                borderRadius: '16px',
                overflow: 'hidden',
                transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
                transition: 'all 0.4s ease',
                boxShadow: isHovered
                    ? '0 20px 40px rgba(0, 0, 0, 0.1)'
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            cover={
                <div
                    style={{
                        height: '220px',
                        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    {/* Decorative elements */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-50%',
                            right: '-20%',
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                            transition: 'transform 0.4s ease',
                        }}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '-30%',
                            left: '-10%',
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            transform: isHovered ? 'scale(1.3)' : 'scale(1)',
                            transition: 'transform 0.4s ease',
                        }}
                    />

                    {/* Project icon/title overlay */}
                    <div style={{
                        textAlign: 'center',
                        color: 'white',
                        zIndex: 2,
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.3s ease',
                    }}>
                        <Title level={3} style={{ color: 'white', margin: 0, fontWeight: 'bold' }}>
                            {project.title}
                        </Title>
                        {/* <Text style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
                            Featured Project
                        </Text> */}
                    </div>
                </div>
            }
            actions={[
                <Button
                    type="text"
                    icon={<GithubOutlined />}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open GitHub repo for ${project.title}`}
                    style={{
                        color: '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '4px',
                    }}
                >
                    Code
                </Button>
            ]}
            bodyStyle={{ padding: '24px' }}
        >
            <div style={{ minHeight: '160px' }}>
                <Paragraph
                    style={{
                        fontSize: '15px',
                        lineHeight: '1.6',
                        marginBottom: '16px',
                        color: '#666',
                    }}
                >
                    {project.description}
                </Paragraph>

                <Divider style={{ margin: '16px 0' }} />

                {/* Technology stack */}
                <div style={{ marginBottom: '16px' }}>
                    <Text strong style={{ fontSize: '14px', color: '#333', marginBottom: '8px', display: 'block' }}>
                        Tech Stack:
                    </Text>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {project.technologies.map((tech, i) => (
                            <Tag
                                key={i}
                                color="blue"
                                style={{
                                    borderRadius: '12px',
                                    padding: '4px 12px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    border: 'none',
                                    background: '#e6f7ff',
                                    color: '#1890ff',
                                }}
                            >
                                {tech}
                            </Tag>
                        ))}
                    </div>
                </div>

                {/* Removed project stats section per request */}
            </div>
        </Card>
    );
};

export default ProjectCard; 
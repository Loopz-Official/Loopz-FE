import Image from 'next/image';

import { PROJECTS } from '@/constants/projects';

export default function ProjectSection() {
    return PROJECTS.map((project) => (
        <div
            key={project.projectTitle}
            className="text-body-03 text-gray-dark mt-24 font-normal"
        >
            <div className="px-8">
                <div className="text-caption-01 text-point mb-0.5 font-medium">
                    Project {project.projectNum}
                </div>
                <div className="text-headline-02 mb-5 text-black">
                    Project {project.projectTitle}
                </div>

                <div className="mb-4 whitespace-pre-line font-medium">
                    {project.title}
                </div>

                {project.projectTitle === 'FLOW' && (
                    <div className="text-caption-01 mb-4 w-fit rounded-full bg-black px-3 py-2 text-white">
                        <a
                            href="https://loopz-flow.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-fit"
                        >
                            바로가기 &nbsp; &gt;
                        </a>
                    </div>
                )}
            </div>

            <div className="relative mb-6 aspect-[9/5] h-auto">
                <Image
                    src={project.imageUrl}
                    alt="목업 이미지 2"
                    fill
                    className="h-full w-full"
                />
            </div>

            <div className="space-y-4 px-8">
                {project.descriptions.map((description) => (
                    <div key={description}>{description}</div>
                ))}
            </div>
        </div>
    ));
}

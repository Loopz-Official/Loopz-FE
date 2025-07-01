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

                <div className="mb-4 font-medium">{project.title}</div>
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
